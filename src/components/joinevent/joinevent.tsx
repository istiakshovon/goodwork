'use client'

import React, { useState, type FormEvent } from 'react';
import { authClient } from '@/lib/auth-client';
import { type EventItem } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getTokenFromClient } from '@/lib/getTokenFromClient';

const JoinEvent = ({ events }: { events: EventItem }) => {

    const [joined, setJoined] = useState(false)

    const router = useRouter()
    const { data: session } = authClient.useSession()
    const user = session?.user;

    const handleJoinEvent = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        if (session?.user) {
            const data = {
                name: user?.name,
                email: user?.email,
                type: events?.type,
                date: events?.date,
                location: events?.location,
                description: events?.description,
                image: events?.image,
                eventId: events._id,
                eventName: events.title,
            }

            const token = await getTokenFromClient();
            const res = await fetch('http://localhost:5000/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data),
            })
            const join = await res.json()
            console.log(join)
            if (res.ok) {
                setJoined(true)
                toast.success('Successfully joined the event!')
            }else{
                toast.error('Failed to join the event. Please try again.')
            }

        } else {
            router.push('/login')
            return;
        }
    }


    return (
        <form onSubmit={handleJoinEvent}>
            <button
                type="submit"
                disabled={joined}
                className={`inline-flex h-12 w-full items-center justify-center rounded-full text-base font-semibold text-white shadow-md transition-all
        ${joined
                        ? 'bg-gray-300  cursor-not-allowed'
                        : 'bg-brand shadow-brand/30 hover:bg-brand-dark'
                    }`}
            >
                {joined ? '✓ Joined' : 'Join Event'}
            </button>
        </form>
    );
};

export default JoinEvent;
