import {
  BookOpen,
  Snowflake,
  Sprout,
  Trash2,
  Utensils,
  type LucideIcon,
} from "lucide-react";

const focusAreas: { label: string; icon: LucideIcon }[] = [
  { label: "Winter Relief", icon: Snowflake },
  { label: "Tree Planting", icon: Sprout },
  { label: "Clean-ups", icon: Trash2 },
  { label: "Food Sharing", icon: Utensils },
  { label: "Education", icon: BookOpen },
];

export function FocusAreas() {
  return (
    <section id="causes" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Focus areas
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl">
            Pick the cause that pulls you in
          </h2>
          <p className="mt-4 text-slate-600">
            From winter warmth to weekend clean-ups, every focus area has
            events waiting for an extra pair of hands.
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {focusAreas.map((area) => (
            <li key={area.label}>
              <a
                href="#events"
                className="group inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-orange-50 hover:text-brand-dark"
              >
                <area.icon
                  className="size-4 text-slate-400 transition-colors group-hover:text-brand"
                  aria-hidden="true"
                />
                {area.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
