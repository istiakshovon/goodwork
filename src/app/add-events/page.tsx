"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, ImageIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const eventTypes = [
  "Donation",
  "Winter Relief",
  "Tree Plantation",
  "Cleanup",
  "Food Sharing",
  "Education",
  "Health Camp",
  "Other",
];

const initialForm = {
  title: "",
  type: null as string | null,
  date: "",
  location: "",
  email: "",
  image: "",
  description: "",
  maxVolunteers: "",
  phone: "",
};

type Form = typeof initialForm;
type TextKey = Exclude<keyof Form, "type">;
type Errors = Partial<Record<keyof Form | "submit", string>>;

type FieldProps = {
  id: string;
  label: ReactNode;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

function Field({ id, label, required, error, hint, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-brand"> *</span>}
      </Label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-destructive">{error}</p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  const setField = (key: keyof Form, value: string | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const changeImage = (value: string) => {
    setField("image", value);
    setImageError(false);
  };

  const bind = (key: TextKey) => ({
    id: key,
    name: key,
    value: form[key],
    "aria-invalid": !!errors[key],
    className: "h-11 rounded-xl",
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setField(key, e.target.value),
  });

  const validate = () => {
    const e: Errors = {};
    const { title, type, date, location, email, image } = form;
    const { description, maxVolunteers, phone } = form;

    if (!title.trim()) e.title = "Event title is required";
    if (!type) e.type = "Choose an event type";

    if (!date) e.date = "Pick a date for your event";
    else if (date <= today) e.date = "Dates must be in the future";

    if (!location.trim()) e.location = "Add a location or venue";

    if (!email.trim()) e.email = "Contact email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Enter a valid email address";

    if (!image.trim()) e.image = "Please provide an image URL";
    else if (!/^https?:\/\/\S+$/i.test(image.trim()))
      e.image = "Please enter a valid image URL";

    if (!description.trim()) e.description = "Describe your event for volunteers";

    if (maxVolunteers.trim() && !/^[1-9]\d*$/.test(maxVolunteers.trim()))
      e.maxVolunteers = "Enter a number of 1 or more";

    if (phone && !/^\d{10}$/.test(phone))
      e.phone = "Enter a valid 10-digit number (e.g. 1712345678)";

    return e;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

const token = await getTokenFromClient()

    if (!user?.email) return setErrors({ submit: "Please log in first" });

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          image: form.image.trim(),
          creatorName: user.name,
          creatorEmail: user.email,
        }),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to create event");
      setSubmitted(true);
    } catch (err) {
      setErrors({
        submit:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setImageError(false);
    setSubmitted(false);
  };

  return (
    <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
        <Link
          href="/events"
          className="group mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-brand-dark"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Events
        </Link>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="items-center gap-3 px-6 pt-7 text-center">
            <Badge className="h-6 px-3 text-xs font-semibold uppercase tracking-wider">
              Social Service Event
            </Badge>
            <CardTitle className="text-2xl font-extrabold sm:text-3xl">
              Create a Community Event
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed sm:text-base">
              Organize a local relief effort, environmental cleanup, or
              community support event.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-7">
            {submitted ? (
              <div
                role="status"
                className="flex flex-col items-center gap-4 py-6 text-center"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="size-7" />
                </span>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-slate-900">
                    Event created
                  </h2>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600">
                    {form.title} is now listed for the community. Volunteers can
                    reach you at {form.email}.
                  </p>
                </div>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button size="lg" className="rounded-full px-6" onClick={resetForm}>
                    Create another event
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-6"
                    onClick={() => router.push("/my-create-event")}
                  >
                    View My Events
                  </Button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="space-y-6">
                <Field id="title" label="Event Title" required error={errors.title}>
                  <Input
                    {...bind("title")}
                    placeholder="e.g. Winter Coat Drive at Riverside Center"
                  />
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="type" label="Event Type" required error={errors.type}>
                    <Select
                      value={form.type}
                      onValueChange={(value) => setField("type", value)}
                    >
                      <SelectTrigger
                        id="type"
                        type="button"
                        aria-invalid={!!errors.type}
                        className="h-11 w-full rounded-xl px-4"
                      >
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field
                    id="date"
                    label="Event Date"
                    required
                    error={errors.date}
                    hint="Dates must be in the future"
                  >
                    <Input
                      {...bind("date")}
                      type="date"
                      min={today}
                      suppressHydrationWarning
                    />
                  </Field>
                </div>

                <Field id="location" label="Location / Venue" required error={errors.location}>
                  <Input
                    {...bind("location")}
                    placeholder="e.g. Riverside Community Center, 4th Ave"
                  />
                </Field>

                <Field
                  id="email"
                  label="Contact Email"
                  required
                  error={errors.email}
                  hint="Volunteers will use this email to contact you"
                >
                  <Input
                    {...bind("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="organizer@neighborhood.org"
                  />
                </Field>

                <Field
                  id="image"
                  label="Thumbnail Image URL"
                  required
                  error={errors.image}
                  hint="Paste a direct image URL from your browser."
                >
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      {...bind("image")}
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      className="h-11 rounded-xl pl-10 pr-10"
                      onChange={(e) => changeImage(e.target.value)}
                    />
                    {form.image && (
                      <button
                        type="button"
                        aria-label="Remove image URL"
                        onClick={() => changeImage("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-red-500"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>

                  {form.image.trim() && !imageError && (
                    <div className="relative mt-3 h-48 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <Image
                        src={form.image.trim()}
                        alt="Event thumbnail preview"
                        fill
                        unoptimized
                        sizes="(min-width: 640px) 36rem, 100vw"
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  )}

                  {imageError && (
                    <p className="text-xs font-medium text-destructive">
                      Image could not be loaded. Please check the image URL.
                    </p>
                  )}
                </Field>

                <Field
                  id="description"
                  label="Event Description"
                  required
                  error={errors.description}
                >
                  <Textarea
                    {...bind("description")}
                    rows={5}
                    placeholder="What, where, and why — tell volunteers what to expect on the day."
                    className="min-h-32 resize-y rounded-xl px-4 py-3"
                  />
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="maxVolunteers" label="Max Volunteers" error={errors.maxVolunteers}>
                    <Input
                      {...bind("maxVolunteers")}
                      type="number"
                      min={1}
                      placeholder="e.g. 50"
                    />
                  </Field>

                  <Field
                    id="phone"
                    label={
                      <>
                        Contact Phone
                        <span className="text-xs font-normal text-muted-foreground">
                          {" "}(optional)
                        </span>
                      </>
                    }
                    error={errors.phone}
                    hint="Enter the 10 digits after +880 (e.g. 1712345678)"
                  >
                    <div className="flex">
                      <span className="flex h-11 shrink-0 select-none items-center rounded-l-xl border border-r-0 border-input bg-muted/50 px-3 text-sm font-semibold text-slate-600">
                        +880
                      </span>
                      <Input
                        {...bind("phone")}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="17....."
                        className="h-11 flex-1 rounded-l-none rounded-r-xl"
                        onChange={(e) =>
                          setField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                      />
                    </div>
                  </Field>
                </div>

                {errors.submit && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {errors.submit}
                  </p>
                )}

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="rounded-full px-7 shadow-md shadow-brand/30"
                  >
                    {loading ? "Submitting..." : "Submit & Publish"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="rounded-full px-6"
                    onClick={() => router.push("/events")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}