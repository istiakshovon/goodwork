import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  UserPlus,
  Users,
} from "lucide-react";
import { buttonStyles } from "@/lib/buttons";
import { cn } from "cn";

const events = [
  {
    category: "Winter Relief",
    title: "Coat & Blanket Distribution Day",
    description:
      "Sort and hand out winter kits — coats, blankets, and hot meals — to neighbors bracing for the first cold snap of the season.",
    date: "Sun, Nov 8 · 9:00 AM",
    location: "Riverside Community Center",
    organizer: "Maya Chen",
    initials: "MC",
    spotsLeft: 8,
    image:
      "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=75",
    alt: "Snow-covered evergreen glowing in the golden light of a winter morning",
  },
  {
    category: "Tree Planting",
    title: "Maple Street Sapling Day",
    description:
      "Plant 60 saplings along the avenue with the urban forestry crew. Shovels, gloves, and coffee provided — beginners very welcome.",
    date: "Sat, Nov 14 · 10:00 AM",
    location: "Maple Street median, East End",
    organizer: "Dev Patel",
    initials: "DP",
    spotsLeft: 24,
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=75",
    alt: "Two hands cradling a young evergreen seedling above the forest floor",
  },
  {
    category: "Food Sharing",
    title: "Saturday Pantry Pack-Up",
    description:
      "Pack and deliver fresh grocery boxes to more than 200 households. Lifting stations and route buddies provided.",
    date: "Sun, Nov 22 · 8:00 AM",
    location: "Harvest Table Food Bank",
    organizer: "Aisha Rahman",
    initials: "AR",
    spotsLeft: 5,
    image:
      "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=1200&q=75",
    alt: "Volunteers unloading crates of fresh produce from a delivery truck",
  },
];

export function UpcomingEvents() {
  return (
    <section id="events" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Happening soon
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl">
              Upcoming events near you
            </h2>
            <p className="mt-4 text-slate-600">
              Three events looking for extra hands right now — spots go fast.
            </p>
          </div>
          <a
            href="#events"
            className="group hidden items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-dark sm:inline-flex"
          >
            Browse all events
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {events.map((event) => (
            <article
              key={event.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-200 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={event.image}
                  alt={event.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur">
                  {event.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays
                      className="size-3.5 text-brand"
                      aria-hidden="true"
                    />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin
                      className="size-3.5 text-brand"
                      aria-hidden="true"
                    />
                    {event.location}
                  </span>
                </div>

                <h3 className="mt-3 font-heading text-lg font-bold text-slate-900 transition-colors group-hover:text-brand">
                  {event.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 pt-3">
                  <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-brand-dark">
                    ( {event.category} )
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    Ongoing
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex size-8 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white"
                      aria-hidden="true"
                    >
                      {event.initials}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      {event.organizer}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-brand-dark">
                    <Users className="size-3" aria-hidden="true" />
                    {event.spotsLeft} spots left
                  </span>
                </div>

                <a
                  href="#join"
                  className={cn(buttonStyles({ size: "block", variant: "navy" }), "mt-4")}
                >
                  <UserPlus className="size-4" aria-hidden="true" />
                  Join Event
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Featured event banner */}
        <article className="group mt-8 overflow-hidden rounded-3xl bg-navy shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-soft">
                ( Featured )
              </span>
              <h3 className="mt-4 font-heading text-2xl font-extrabold leading-snug text-balance text-white sm:text-3xl">
                The Hidden Superheroes: Blood Donation Camp
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                Donate blood, save a life. Walk-in donors, volunteers for
                registration desks, and helpers for the recovery lounge are all
                welcome.
              </p>
              <div className="mt-6">
                <a
                  href="#join"
                  className={buttonStyles({ variant: "primary", size: "md" })}
                >
                  <UserPlus className="size-4" aria-hidden="true" />
                  Join Event
                </a>
              </div>
            </div>
            <div className="relative min-h-56">
              <Image
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=75"
                alt="Volunteer giving blood at a community donation camp"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-navy via-navy/20 to-transparent max-md:bg-gradient-to-t"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
