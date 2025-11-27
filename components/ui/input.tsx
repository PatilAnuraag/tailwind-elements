import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted focus-visible:bg-transparent focus-visible:border-input",
        flushed: "rounded-none border-x-0 border-t-0 border-b px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary",
        material: "rounded-none border-0 border-b-2 border-input bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary",
        neobrutalism: "border-2 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof inputVariants>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };