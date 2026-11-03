import Link from "next/link";
import { CalendarDays, Heart, Plus, Search, Sparkles, Users } from "lucide-react";
import { buttonStyles } from "@/lib/buttons";

const stats = [
  { icon: Users, value: "2,100+", label: "Volunteers" },
  { icon: CalendarDays, value: "310+", label: "Community Events" },
  { icon: Heart, value: "38k+", label: "Lives touched" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy">
      {/* Decorative glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-12%] size-[28rem] rounded-full bg-brand/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-25%] left-[-10%] size-96 rounded-full bg-orange-600/10 blur-3xl"
      />
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:32px_32px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-40 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Grassroots · Local · Real Impact
            </span>

            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.06] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              Turn compassion into{" "}
              <span className="bg-gradient-to-r from-brand via-orange-400 to-orange-300 bg-clip-text text-transparent">
                action
              </span>{" "}
              where you live.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              GoodWork is where neighbors turn spare hours into real results.
              Discover local causes, join an event down the street, or rally
              your whole block around something that matters.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#events"
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                <Search className="size-5" aria-hidden="true" />
                Find nearby events
              </a>
              <Link
                href="/add-destination"
                className={buttonStyles({ variant: "onDark", size: "lg" })}
              >
                <Plus className="size-5" aria-hidden="true" />
                Create an Event
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                Live impact
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                <span
                  className="size-1.5 rounded-full bg-emerald-400"
                  aria-hidden="true"
                />
                Growing weekly
              </span>
            </div>

            <dl className="grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/10 bg-navy-light/60">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 px-2 py-5 text-center sm:px-4"
                >
                  <stat.icon
                    className="mb-1 size-5 text-orange-300"
                    aria-hidden="true"
                  />
                  <dd className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-center text-xs text-slate-400">
              Real numbers from real events, updated weekly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
