import { Star } from "lucide-react";

const stories = [
  {
    tag: "Organizing",
    quote:
      "One street went from “nobody talks” to 60 volunteers in a season. GoodWork just gave us the board to hang it all on.",
    name: "Maya Chen",
    role: "Event organizer",
    initials: "MC",
  },
  {
    tag: "Giving",
    quote:
      "A kid's coin jar funded 40 school kits for the whole block. Seeing neighbors rally behind a ten-year-old's idea still gives me chills.",
    name: "Dev Patel",
    role: "Winter Relief volunteer",
    initials: "DP",
  },
  {
    tag: "Youth",
    quote:
      "A play street brought 300 kids outside in one afternoon. I found my crew here — we've run four events since.",
    name: "Aisha Rahman",
    role: "Food Sharing organizer",
    initials: "AR",
  },
];

export function Stories() {
  return (
    <section id="stories" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Impact stories
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl">
            Moments that moved a neighborhood
          </h2>
          <p className="mt-4 text-slate-600">
            Every number on this page started with somebody deciding to show
            up.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3 lg:gap-8">
          {stories.map((story) => (
            <article
              key={story.name}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-lg"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                {story.tag}
              </span>

              <div
                className="mt-4 flex gap-0.5 text-brand"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                {story.quote}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span
                  className="flex size-9 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white"
                  aria-hidden="true"
                >
                  {story.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {story.name}
                  </p>
                  <p className="text-xs text-slate-500">{story.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
