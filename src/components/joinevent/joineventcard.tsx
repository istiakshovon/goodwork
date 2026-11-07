"use client"
import { MapPin, CalendarDays, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type EventItem } from "@/lib/types";

const JoinEventCard = ({ event }: { event: EventItem }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/my-events/${event._id}`, {
      method: "DELETE",
    });
    await res.json();
    router.refresh();
  };

  return (
    <article className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <img
        src={event.image}
        alt={event.eventName}
        className="hidden w-40 shrink-0 object-cover sm:block md:w-44"
      />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900">
              {event.eventName}
            </h3>
            <span className="mt-1.5 inline-flex rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-bold text-brand-dark">
              ( {event.type} )
            </span>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="inline-flex rounded-full bg-navy px-2.5 py-1 text-[11px] font-bold text-white">
              Joined
            </span>
            <span className="inline-flex rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-brand-dark">
              Confirmed
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-brand" aria-hidden="true" />
            {event.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-brand" aria-hidden="true" />
            {event.date}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <Link
            href={`/events/${event.eventId}`}
            className="inline-flex h-9 items-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-brand hover:bg-brand/10 hover:text-brand-dark"
          >
            View Event
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-destructive/10 px-4 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/20"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
            Leave event
          </button>
        </div>
      </div>
    </article>
  );
};

export default JoinEventCard;
