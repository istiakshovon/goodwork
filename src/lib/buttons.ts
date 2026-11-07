import { cva, type VariantProps } from "class-variance-authority";

/**
 * Shared CTA button styles for the marketing surface.
 * Brand variants use the `brand` tokens defined in globals.css.
 */
export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white shadow-md shadow-brand/30 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/40",
        navy: "bg-navy text-white shadow-md shadow-navy/25 hover:-translate-y-0.5 hover:bg-navy-light hover:shadow-lg",
        outline:
          "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900",
        onBrand:
          "bg-white text-brand-dark shadow-md hover:-translate-y-0.5 hover:bg-brand/10",
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
