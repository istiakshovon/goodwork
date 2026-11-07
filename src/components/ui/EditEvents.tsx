"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const EVENT_TYPES = [
  "Relief Effort",
  "Environmental Cleanup",
  "Community Support",
  "Blood Donation",
  "Other",
]; 

const inputClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelClass = "mb-1 block text-sm font-semibold text-slate-800";

const EditEvents = ({ event, onUpdated }: any) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    title: event?.title || "",
    type: event?.type || "",
    date: event?.date ? event.date.slice(0, 10) : "",
    location: event?.location || "",
    contactEmail: event?.contactEmail || "",
    image: event?.image || "",
    description: event?.description || "",
    maxVolunteers: event?.maxVolunteers || "",
  });

  const handleChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);

const {_id, ...data} = form as any


const token = await getTokenFromClient()

    try {
      const res = await fetch(`http://localhost:5000/events/${event._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", 
            Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Update failed");

      onUpdated?.(); 
      setOpen(false);
    } catch (err) {
      console.error(err);
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-9 items-center rounded-full border border-slate-200 px-4 font-semibold text-slate-700 shadow-sm transition-colors hover:border-brand hover:bg-brand/10 hover:text-brand-dark">
        Update
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:min-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Update your event details and save the changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-slate-200 rounded-lg bg-white shadow-sm">
          <div>
            <label className={labelClass}>Event Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Winter Coat Drive at Riverside Center"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Event Type *</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select event type</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Event Date *</label>
              <input
                type="date"
                name="date"
                min={today}
                value={form.date}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Location / Venue *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="e.g. Riverside Community Center, 4th Ave"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Contact Email *</label>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              required
              placeholder="organizer@neighborhood.org"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Thumbnail Image URL *</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Event Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="What, where, and why — tell volunteers what to expect."
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Max Volunteers</label>
            <input
              type="number"
              min="1"
              name="maxVolunteers"
              value={form.maxVolunteers}
              onChange={handleChange}
              placeholder="e.g. 50"
              className={inputClass}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-brand px-6 py-2 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-slate-200 px-6 py-2 font-semibold text-slate-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEvents;