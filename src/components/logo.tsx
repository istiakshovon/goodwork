import { HeartHandshake } from "lucide-react";
import { cn } from "cn";

export function Logo({
  className,
  variant = "on-dark",
}: {
  className?: string;
  variant?: "on-dark" | "on-light";
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark shadow-md shadow-brand/40">
        <HeartHandshake className="size-5 text-white" aria-hidden="true" />
      </span>
      <span
        className={cn(
          "font-heading text-lg font-extrabold tracking-tight",
          variant === "on-light" ? "text-slate-900" : "text-white"
        )}
      >
        GoodWork
      </span>
    </span>
  );
}
