import { cva, type VariantProps } from "class-variance-authority";

/**
 * Shared CTA button styles for the marketing surface.
 * Brand gradient variants use the `brand` tokens defined in globals.css.
 */
export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-brand to-brand-dark text-white shadow-md shadow-orange-500/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30",
        onDark:
          "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white/20",
        outline:
          "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900",
        onBrand:
          "bg-white text-orange-700 shadow-md hover:-translate-y-0.5 hover:bg-orange-50",
        ghostOnBrand:
          "border border-white/40 text-white hover:-translate-y-0.5 hover:bg-white/15",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        block: "h-11 w-full text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonStylesProps = VariantProps<typeof buttonStyles>;
