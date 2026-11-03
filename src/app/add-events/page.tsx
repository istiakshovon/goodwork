
"use client";

import { useSyncExternalStore, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, ImageIcon, X } from "lucide-react";
import { Logo } from "@/components/logo";
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

type FormState = {
  title: string;
  type: string | null;
  date: string;
  location: string;
  email: string;
  description: string;
  maxVolunteers: string;
  phone: string;
};

const initialForm: FormState = {
  title: "",
  type: null,
  date: "",
  location: "",
  email: "",
  description: "",
  maxVolunteers: "",
  phone: "",
};

function localDateString(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

const subscribeNoop = () => () => {};
const serverToday = () => "";

export default function CreateEventPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = useSyncExternalStore(
    subscribeNoop,
    localDateString,
    serverToday
  );

  const setField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    setErrors((prev) => {
      if (!(key in prev)) return prev;

      const next = { ...prev };
      delete next[key];

      return next;
    });
  };

  const validate = (): Record<string, string> => {
    const next: Record<string, string> = {};

    if (!form.title.trim()) {
      next.title = "Event title is required";
    }

    if (!form.type) {
      next.type = "Choose an event type";
    }

    if (!form.date) {
      next.date = "Pick a date for your event";
    } else if (form.date <= localDateString()) {
      next.date = "Dates must be in the future";
    }

    if (!form.location.trim()) {
      next.location = "Add a location or venue";
    }

    if (!form.email.trim()) {
      next.email = "Contact email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      next.email = "Enter a valid email address";
    }

    if (!imageUrl.trim()) {
      next.image = "Please provide an image URL";
    } else {
      try {
        const url = new URL(imageUrl.trim());

        if (
          url.protocol !== "http:" &&
          url.protocol !== "https:"
        ) {
          throw new Error("Invalid URL");
        }
      } catch {
        next.image = "Please enter a valid image URL";
      }
    }

    if (!form.description.trim()) {
      next.description = "Describe your event for volunteers";
    }

    if (
      form.maxVolunteers.trim() &&
      (!/^\d+$/.test(form.maxVolunteers.trim()) ||
        Number(form.maxVolunteers) < 1)
    ) {
      next.maxVolunteers = "Enter a number of 1 or more";
    }

    if (
      form.phone.trim() &&
      !/^\d{10}$/.test(form.phone.trim())
    ) {
      next.phone = "Enter a valid 10-digit number (e.g. 1712345678)";
    }

    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/add-destination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          image: imageUrl.trim(),
        }),
      });

      const data = await res.json();

      console.log("Server Response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting event:", error);

      setErrors((prev) => ({
        ...prev,
        submit:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setImageUrl("");
    setImageError(false);
    setSubmitted(false);
  };

  const requiredMark = (
    <span className="text-brand" aria-hidden="true">
      {" "}*
    </span>
  );

  return (
    <>
      <header className="sticky top-16 z-40 mt-16 border-b border-slate-200 bg-white/85 backdrop-blur md:top-[72px] md:mt-[72px]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="GoodWork home">
            <Logo variant="on-light" />
          </Link>

          <Link
            href="/#events"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-brand-dark"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            Back to Events
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
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
                    <CheckCircle2 className="size-7" aria-hidden="true" />
                  </span>

                  <div className="space-y-1.5">
                    <h2 className="font-heading text-xl font-bold text-slate-900">
                      Event created
                    </h2>

                    <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600">
                      {form.title} is now listed for the community.
                      Volunteers can reach you at {form.email}.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <Button
                      size="lg"
                      className="rounded-xl px-6"
                      onClick={resetForm}
                    >
                      Create another event
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl px-6"
                      onClick={() => router.push("/#events")}
                    >
                      Back to Events
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Event Title */}
                  <div className="space-y-2">
                    <Label htmlFor="event-title">
                      Event Title{requiredMark}
                    </Label>

                    <Input
                      id="event-title"
                      name="title"
                      required
                      aria-invalid={!!errors.title}
                      placeholder="e.g. Winter Coat Drive at Riverside Center"
                      className="h-11 rounded-xl"
                      value={form.title}
                      onChange={(event) =>
                        setField("title", event.target.value)
                      }
                    />

                    {errors.title && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Event Type + Event Date */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="event-type">
                        Event Type{requiredMark}
                      </Label>

                      <Select
                        value={form.type}
                        onValueChange={(value) =>
                          setField("type", value as string | null)
                        }
                      >
                        <SelectTrigger
                          id="event-type"
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

                      {errors.type && (
                        <p className="text-xs font-medium text-destructive">
                          {errors.type}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="event-date">
                        Event Date{requiredMark}
                      </Label>

                      <Input
                        id="event-date"
                        name="date"
                        type="date"
                        required
                        min={today || undefined}
                        aria-invalid={!!errors.date}
                        className="h-11 rounded-xl"
                        value={form.date}
                        onChange={(event) =>
                          setField("date", event.target.value)
                        }
                      />

                      {errors.date ? (
                        <p className="text-xs font-medium text-destructive">
                          {errors.date}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Dates must be in the future
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location / Venue */}
                  <div className="space-y-2">
                    <Label htmlFor="event-location">
                      Location / Venue{requiredMark}
                    </Label>

                    <Input
                      id="event-location"
                      name="location"
                      required
                      aria-invalid={!!errors.location}
                      placeholder="e.g. Riverside Community Center, 4th Ave"
                      className="h-11 rounded-xl"
                      value={form.location}
                      onChange={(event) =>
                        setField("location", event.target.value)
                      }
                    />

                    {errors.location && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  {/* Contact Email */}
                  <div className="space-y-2">
                    <Label htmlFor="event-email">
                      Contact Email{requiredMark}
                    </Label>

                    <Input
                      id="event-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      placeholder="organizer@neighborhood.org"
                      className="h-11 rounded-xl"
                      value={form.email}
                      onChange={(event) =>
                        setField("email", event.target.value)
                      }
                    />

                    {errors.email ? (
                      <p className="text-xs font-medium text-destructive">
                        {errors.email}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Volunteers will use this email to contact you
                      </p>
                    )}
                  </div>

                  {/* Thumbnail Image URL */}
                  <div className="space-y-2">
                    <Label htmlFor="event-image">
                      Thumbnail Image URL{requiredMark}
                    </Label>

                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="event-image"
                        name="image"
                        type="url"
                        required 
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        aria-invalid={!!errors.image}
                        className="h-11 rounded-xl pl-10 pr-10"
                        onChange={(event) => {
                          setImageUrl(event.target.value);
                          setImageError(false);

                          setErrors((prev) => {
                            if (!prev.image) return prev;

                            const next = { ...prev };
                            delete next.image;
                            return next;
                          });
                        }}
                      />

                      {imageUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setImageUrl("");
                            setImageError(false);
                          }}
                          aria-label="Remove image URL"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-red-500"
                        >
                          <X className="size-4" />
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Paste a direct image URL from your browser.
                    </p>

                    {imageUrl.trim() && !imageError && (
                      <div className="relative mt-3 h-48 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                        <Image
                          src={imageUrl.trim()}
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

                    {errors.image && (
                      <p
                        className="text-xs font-medium text-destructive"
                        role="alert"
                      >
                        {errors.image}
                      </p>
                    )}
                  </div>

                  {/* Event Description */}
                  <div className="space-y-2">
                    <Label htmlFor="event-description">
                      Event Description{requiredMark}
                    </Label>

                    <Textarea
                      id="event-description"
                      name="description"
                      required
                      rows={5}
                      aria-invalid={!!errors.description}
                      placeholder="What, where, and why — tell volunteers what to expect on the day."
                      className="min-h-32 rounded-xl px-4 py-3 resize-y"
                      value={form.description}
                      onChange={(event) =>
                        setField("description", event.target.value)
                      }
                    />

                    {errors.description && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Max Volunteers + Contact Phone */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="max-volunteers">
                        Max Volunteers
                      </Label>

                      <Input
                        id="max-volunteers"
                        name="maxVolunteers"
                        type="number"
                        min={1}
                        aria-invalid={!!errors.maxVolunteers}
                        placeholder="e.g. 50"
                        className="h-11 rounded-xl"
                        value={form.maxVolunteers}
                        onChange={(event) =>
                          setField("maxVolunteers", event.target.value)
                        }
                      />

                      {errors.maxVolunteers && (
                        <p className="text-xs font-medium text-destructive">
                          {errors.maxVolunteers}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="event-phone">
                        Contact Phone
                        <span className="text-xs font-normal text-muted-foreground">
                          {" "}(optional)
                        </span>
                      </Label>

                      <div className="flex">
                        <span className="flex h-11 shrink-0 select-none items-center rounded-l-xl border border-r-0 border-input bg-muted/50 px-3 text-sm font-semibold text-slate-600">
                          +880
                        </span>

                        <Input
                          id="event-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel-national"
                          placeholder="17....."
                          aria-invalid={!!errors.phone}
                          className="h-11 flex-1 rounded-l-none rounded-r-xl"
                          value={form.phone}
                          onChange={(event) =>
                            setField(
                              "phone",
                              event.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10)
                            )
                          }
                        />
                      </div>

                      {errors.phone ? (
                        <p className="text-xs font-medium text-destructive">
                          {errors.phone}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Enter the 10 digits after +880 (e.g. 1712345678)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                      {errors.submit}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="rounded-xl px-6 shadow-md shadow-orange-500/25"
                    >
                      {loading ? "Creating Event..." : "Create Event"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="rounded-xl px-6"
                      onClick={() => router.push("/#events")}
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
    </>
  );
}
