'use client'

import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { CalendarDays, MapPin, Plus, Users } from 'lucide-react'
import Link from 'next/link'
import { type EventItem } from '@/lib/types'
import EditEvents from '@/components/ui/EditEvents'

const MyCreatedEventsPage = () => {
    const { data: session } = authClient.useSession()
    const [events, setEvents] = useState<EventItem[] | null>(null)

    useEffect(() => {
        if (!session?.user?.email) return

        let cancelled = false

        fetch(`http://localhost:5000/mycreated-events/${session.user.email}`)
            .then(res => res.json())
            .then(data => {
                if (!cancelled) setEvents(Array.isArray(data) ? data : [])
            })
            .catch(() => {
                if (!cancelled) setEvents([])
            })

        return () => {
            cancelled = true
        }
    }, [session?.user?.email])

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                        Organizer
                    </p>
                    <h1 className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        Manage My Created Events
                    </h1>
                </div>
                <Link
                    href="/add-events"
                    className="inline-flex h-11 items-center gap-2 self-start rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-md shadow-brand/30 transition-all hover:bg-brand-dark sm:self-auto"
                >
                    <Plus className="size-4" aria-hidden="true" />
                    Create New Event
                </Link>
            </div>

            {!session?.user?.email ? (
                <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                    <p className="text-sm text-slate-600">
                        Sign in to manage the events you created.
                    </p>
                    <Link
                        href="/login"
                        className="mt-4 inline-flex h-10 items-center rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-md shadow-brand/30 transition-all hover:bg-brand-dark"
                    >
                        Sign in
                    </Link>
                </div>
            ) : events === null ? (
                <p className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                    Loading your events…
                </p>
            ) : events.length === 0 ? (
                <p className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                    You haven&apos;t created any events yet. Click “Create New Event” to get started.
                </p>
            ) : (
                <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                                    <th className="px-5 py-4">Event Name</th>
                                    <th className="px-5 py-4">Date</th>
                                    <th className="px-5 py-4">Volunteers Applied</th>
                                    <th className="px-5 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {events.map(event => (
                                    <tr key={event._id} className="transition-colors hover:bg-slate-50/60">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="size-12 shrink-0 rounded-xl object-cover"
                                                />
                                                <div className="min-w-0">
                                                    <p className="truncate font-bold text-slate-900">
                                                        {event.title}
                                                    </p>
                                                    <p className="truncate text-xs text-slate-500">
                                                        <MapPin className="mr-1 inline size-3 text-brand" aria-hidden="true" />
                                                        {event.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            <span className="inline-flex items-center gap-1.5">
                                                <CalendarDays className="size-3.5 text-brand" aria-hidden="true" />
                                                {event.date}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Users className="size-3.5 text-brand" aria-hidden="true" />
                                                {event.maxVolunteers ? `${event.maxVolunteers} needed` : '—'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <EditEvents event={event} />
                                               
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyCreatedEventsPage
