"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { cn } from "cn";
import { buttonStyles } from "@/lib/buttons";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 rounded-2xl border border-slate-100 bg-slate-50 p-8 shadow-sm md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-xl">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-3xl">
              Get the good news first
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              One email a week: new events near you, open calls for
              volunteers, and stories from the block. No spam, unsubscribe
              anytime.
            </p>
          </div>

          <form
            className="w-full md:max-w-md"
            onSubmit={(event) => {
              event.preventDefault();
              if (email.trim()) {
                setSubscribed(true);
              }
            }}
          >
            {subscribed ? (
              <p
                role="status"
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-100 px-4 text-center text-sm font-semibold text-emerald-700"
              >
                <Check className="size-4 shrink-0" aria-hidden="true" />
                You&apos;re on the list — see you out there.
              </p>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@neighborhood.org"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 transition-shadow placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/60 sm:flex-1"
                />
                <button
                  type="submit"
                  className={cn(buttonStyles({ size: "lg" }), "sm:w-auto w-full")}
                >
                  Subscribe
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
