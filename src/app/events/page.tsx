import Link from 'next/link';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { type EventItem } from '@/lib/types';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getTokenFromServer } from '@/lib/getTokenFromServer';
export const dynamic = "force-dynamic";
const AllEvents = async () => {




const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
    const data = await res.json()

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                        Happening soon
                    </p>
                    <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl">
                        Explore Upcoming Social Events
                    </h1>
                    <p className="mt-3 text-slate-600">
                        Real events posted by real neighbors — grab a spot before they fill up.
                    </p>
                </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((event: EventItem) => (
                    <article
                        key={event._id}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur">
                                ( {event.type} )
                            </span>
                        </div>

                        <div className="flex flex-1 flex-col p-5">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-500">
                                <span className="inline-flex items-center gap-1.5">
                                    <CalendarDays className="size-3.5 text-brand" aria-hidden="true" />
                                    {event.date}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="size-3.5 text-brand" aria-hidden="true" />
                                    {event.location}
                                </span>
                            </div>

                            <h2 className="mt-2.5 font-heading text-lg font-bold text-slate-900 transition-colors group-hover:text-brand">
                                {event.title}
                            </h2>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                                {event.description}
                            </p>

                            <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-brand-dark">
                                <Users className="size-3" aria-hidden="true" />
                                {event.maxVolunteers ? `${event.maxVolunteers} volunteers needed` : 'Volunteers welcome'}
                            </span>

                            <Link
                                href={`/events/${event._id}`}
                                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-navy text-sm font-semibold text-white shadow-md shadow-navy/20 transition-all hover:bg-navy-light"
                            >
                                View Event
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default AllEvents;
