import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonStyles } from "@/lib/buttons";

export function CallToAction() {
  return (
    <section id="join" className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-400 via-brand to-brand-dark px-6 py-14 shadow-2xl shadow-orange-500/25 sm:px-10 md:px-16 md:py-20">
          {/* Decorative circles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-white/10"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Ready when you are
            </span>
            <h2 className="mt-6 font-heading text-3xl font-extrabold leading-tight tracking-tight text-balance text-white sm:text-4xl md:text-5xl">
              Your neighborhood needs what only you can give.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-orange-100 sm:text-lg">
              Bring an hour, a skill, or a whole crew. Whatever you have to
              give, there is an event on GoodWork that will put it to work.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#events"
                className={buttonStyles({ variant: "onBrand", size: "lg" })}
              >
                Browse open events
                <ArrowRight className="size-5" aria-hidden="true" />
              </a>
              <Link
                href="/add-destination"
                className={buttonStyles({
                  variant: "ghostOnBrand",
                  size: "lg",
                })}
              >
                Create your first event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
