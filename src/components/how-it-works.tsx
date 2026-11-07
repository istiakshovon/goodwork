import {
  ArrowRight,
  MapPin,
  Search,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

const steps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Discover",
    description:
      "Browse events and causes near you, filtered by the issues you care about and the time you have free.",
    icon: Search,
  },
  {
    title: "Join or Create",
    description:
      "Reserve a spot in seconds, or start your own event in minutes — invites, roles, and sign-ups are built in.",
    icon: UserPlus,
  },
  {
    title: "Show Up",
    description:
      "Meet your neighbors, get it done together, and watch the impact numbers climb in real time.",
    icon: MapPin,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Three simple steps
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-slate-600">
            Three steps between you and your next good afternoon.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="group relative flex flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <step.icon className="size-6" aria-hidden="true" />
                </span>
                <span className="font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-slate-300">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute -right-5 top-1/2 hidden size-5 -translate-y-1/2 text-slate-300 md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
