import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import JoinEventCard from '@/components/joinevent/joineventcard';
import { BadgeCheck, Compass } from 'lucide-react';
import Link from 'next/link';
import { type EventItem } from '@/lib/types';

const MyEventsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user;

    let data: EventItem[] = [];
    if (user) {
        const res = await fetch(`http://localhost:5000/my-events/${user?.email}`, {
            cache: "no-store",
        });
        const json = await res.json();
        if (Array.isArray(json)) data = json;
    }

    const today = new Date().toISOString().slice(0, 10);
    const isUpcoming = (event: EventItem) => {
        const date = typeof event?.date === 'string' ? event.date.slice(0, 10) : '';
        return date && date >= today;
    };

    const upcoming = data.filter(isUpcoming);
    const past = data.filter((event) => !isUpcoming(event));
    const totalJoined = upcoming.length + past.length;

    if (!user) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-16 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                    GoodWork
                </p>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-slate-900">
                  Sign in to see your joined events
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  Your reserved events will show up here once you log in.
                </p>
                <Link
                    href="/login"
                    className="mt-8 inline-flex h-12 items-center rounded-full bg-brand px-7 text-base font-semibold text-white shadow-md shadow-brand/30 transition-all hover:bg-brand-dark"
                >
                    Sign in
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <a
                            href="#upcoming"
                            className="rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white"
                        >
                            Upcoming
                        </a>
                        <a
                            href="#past"
                            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:border-brand hover:text-brand-dark"
                        >
                            Past
                        </a>
                        <a
                            href="#archived"
                            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:border-brand hover:text-brand-dark"
                        >
                            Archived
                        </a>
                    </div>

                    <section id="upcoming" className="mt-8 scroll-mt-28">
                        <h2 className="font-heading text-lg font-extrabold text-slate-900">
                            Upcoming
                        </h2>
                        <div className="mt-4 grid gap-4">
                            {upcoming.length > 0 ? (
                                upcoming.map((event) => (
                                    <JoinEventCard event={event} key={event._id} />
                                ))
                            ) : (
                                <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                                    No upcoming events — explore events to reserve your next one.
                                </p>
                            )}
                        </div>
                    </section>

                    <section id="past" className="mt-10 scroll-mt-28">
                        <h2 className="font-heading text-lg font-extrabold text-slate-900">
                            Past
                        </h2>
                        <div className="mt-4 grid gap-4">
                            {past.length > 0 ? (
                                past.map((event) => (
                                    <JoinEventCard event={event} key={event._id} />
                                ))
                            ) : (
                                <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                                    Nothing here yet — past events will show up after their date.
                                </p>
                            )}
                        </div>
                    </section>

                    <section id="archived" className="mt-10 scroll-mt-28">
                        <h2 className="font-heading text-lg font-extrabold text-slate-900">
                            Archived
                        </h2>
                        <div className="mt-4">
                            <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                                Archived events will be kept here.
                            </p>
                        </div>
                    </section>
                </div>

                <aside className="w-full lg:max-w-xs">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                            <BadgeCheck className="size-5" aria-hidden="true" />
                        </span>
                        <p className="mt-4 font-heading text-4xl font-extrabold text-navy">
                            {totalJoined}
                        </p>
                        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-slate-500">
                            Events joined
                        </p>

                        <div className="mt-6 border-t border-slate-100 pt-4">
                            <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                                <Compass className="size-5" aria-hidden="true" />
                            </span>
                            <p className="mt-3 font-heading text-2xl font-extrabold text-navy">
                                {upcoming.length}
                            </p>
                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Upcoming this month
                            </p>
                        </div>

                        <Link
                            href="/events"
                            className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-brand text-sm font-semibold text-white shadow-md shadow-brand/30 transition-all hover:bg-brand-dark"
                        >
                            Join More Events
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default MyEventsPage;
