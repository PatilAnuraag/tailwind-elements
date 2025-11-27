import * as React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const separatorVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      variant: {
        default: "bg-border",
        dashed: "bg-transparent border-t border-dashed border-border",
        dotted: "bg-transparent border-t border-dotted border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof separatorVariants> & {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, variant, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        separatorVariants({ variant }),
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        (variant === "dashed" || variant === "dotted") && orientation === "vertical" ? "border-l border-t-0 h-full w-[1px]" : "",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

export { Separator }