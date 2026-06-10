import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-display font-semibold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green/60 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-green text-base hover:brightness-110 hover:shadow-[0_0_24px_-4px_var(--accent-green)]",
        outline:
          "border border-edge bg-transparent text-content hover:border-accent-green hover:text-accent-green",
        ghost: "bg-transparent text-content hover:bg-elevated",
        danger:
          "bg-accent-red text-content hover:brightness-110 hover:shadow-[0_0_24px_-4px_var(--accent-red)]",
        surface: "bg-surface text-content hover:bg-elevated border border-edge",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
