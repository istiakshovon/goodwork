import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";

const stories = [
  {
    tag: "Organizing",
    title:
      "One street went from “nobody talks” to 60 volunteers in a season",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=75",
    alt: "Volunteer in a pink event shirt standing among a busy crowd",
  },
  {
    tag: "Giving",
    title: "A kid's coin jar funded 40 school kits for the whole block",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1000&q=75",
    alt: "Child holding coins and a handwritten note that reads make a change",
  },
  {
    tag: "Youth",
    title: "A play street brought 300 kids outside in one afternoon",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=75",
    alt: "Group of joyful children reaching toward the camera outdoors",
  },
];

export function Stories() {
  return (
    <section id="stories" className="relative overflow-hidden bg-navy py-16 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 size-[26rem] rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Impact stories
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">
              Moments that moved a neighborhood
            </h2>
            <p className="mt-4 text-slate-400">
              Every number on this page started with somebody deciding to show
              up.
            </p>
          </div>
          <a
            href="#stories"
            className="group hidden items-center gap-2 text-sm font-bold text-orange-300 transition-colors hover:text-orange-200 sm:inline-flex"
          >
            Read all stories
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3 lg:gap-8">
          {stories.map((story) => (
            <article
              key={story.title}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-light"
            >
              <Image
                src={story.image}
                alt={story.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-300">
                  <Quote className="size-3" aria-hidden="true" />
                  {story.tag}
                </span>
                <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-white sm:text-xl">
                  {story.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-300 transition-transform duration-200 group-hover:translate-x-1">
                  Read the story
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
