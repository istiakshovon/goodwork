import JoinEvent from '@/components/joinevent/joinevent';
import { CalendarDays, MapPin, Users } from 'lucide-react';

const EventDetailsPage = async ({ params }: PageProps<'/events/[id]'>) => {
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`)
    const data = await res.json()


    return (
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-xl sm:aspect-[16/7]">
                <img
                    src={data.image}
                    alt={data.title ?? data.name}
                    className="h-full w-full object-cover"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur">
                    ( {data.type} )
                </span>
                
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
                <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                    <h1 className="font-heading text-3xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl">
                        {data.title}
                    </h1>

                    <div className="mt-5 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand-dark">
                            <MapPin className="size-3" aria-hidden="true" />
                            {data.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand-dark">
                            <CalendarDays className="size-3" aria-hidden="true" />
                            {data.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
                            <Users className="size-3" aria-hidden="true" />
                            {data.maxVolunteers ? `${data.maxVolunteers} volunteers needed` : 'Volunteers welcome'}
                        </span>
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {data.description}
                    </p>
                </div>

                <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                        GoodWork
                    </p>
                    <h2 className="mt-1 font-heading text-xl font-extrabold text-slate-900">
                      Join this event
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Reserve your spot and the organizer will reach out with the details.
                    </p>
                    <div className="mt-5">
                        <JoinEvent events={data} />
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default EventDetailsPage;
