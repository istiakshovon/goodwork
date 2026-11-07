'use client';
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Heart, Search, Sparkles, Users } from "lucide-react";
import { buttonStyles } from "@/lib/buttons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const stats = [
  { icon: Users, value: "2,100+", label: "Volunteers" },
  { icon: CalendarDays, value: "310+", label: "Community Events" },
  { icon: Heart, value: "38k+", label: "Lives touched" },
];

export function Hero() {
const {data: session } = authClient.useSession()
const router = useRouter()

const handleCreateEvent = () => {
  if (session?.user) {
    router.push('/add-events')
  } else {
    router.push('/login')
  }
}

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-brand/15 via-brand/5 to-white"
    >
      {/* Decorative glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-12%] size-[28rem] rounded-full bg-brand/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30%] left-[-10%] size-96 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-14 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-dark shadow-sm">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Grassroots · Local · Real Impact
            </span>

            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl">
              Turn compassion into{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                action
              </span>{" "}
              where you live.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
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
             
              <Button 
                className={buttonStyles({ variant: "navy", size: "lg" })}
              
              onClick={handleCreateEvent}>Create an Event</Button>
            </div>

            <dl className="mt-10 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 px-2 py-5 text-center sm:px-4"
                >
                  <stat.icon
                    className="mb-1 size-5 text-brand"
                    aria-hidden="true"
                  />
                  <dd className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-brand/20 ring-1 ring-slate-900/10">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=75"
                alt="Volunteers gathered around a table during a local skill building workshop"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur">
                (Education)
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-soft">
                  Happening this week
                </p>
                <h2 className="mt-2 font-heading text-lg font-bold leading-snug text-white sm:text-xl">
                  Update Today for Tomorrow: Skill Building Workshop
                </h2>
              </div>
            </div>

            <span className="absolute -right-3 -top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg ring-1 ring-slate-900/5">
              <span
                className="size-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              Growing weekly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
