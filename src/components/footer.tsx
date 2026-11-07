import { Logo } from "@/components/logo";

const platformLinks = [
  { label: "Causes", href: "#causes" },
  { label: "Events", href: "#events" },
  { label: "Stories", href: "#stories" },
  { label: "How it works", href: "#how" },
  { label: "Join", href: "#join" },
];

const causeLinks = [
  "Winter Relief",
  "Tree Planting",
  "Clean-ups",
  "Food Sharing",
  "Education",
];

const legalLinks = ["Privacy", "Terms", "Code of conduct"];

export function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <a href="#top" aria-label="GoodWork home">
              <Logo />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              GoodWork is the community board for local action — find causes
              near you, join events run by neighbors, and turn spare hours
              into visible impact.
            </p>
          </div>

          <nav className="md:col-span-2" aria-label="Platform">
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-brand-soft"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Causes">
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white">
              Causes
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {causeLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#causes"
                    className="transition-colors hover:text-brand-soft"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white">
              The spirit
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Small acts, repeated by many, become change. Show up for your
              block, bring a friend, stay for the coffee — that is the whole
              spirit of GoodWork.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © 2026 GoodWork. Built by neighbors, for neighbors.
          </p>
          <div className="flex flex-wrap gap-5 text-xs text-slate-500">
            {legalLinks.map((label) => (
              <a key={label} href="#" className="transition-colors hover:text-slate-300">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
