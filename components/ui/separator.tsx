import * as React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const separatorVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      variant: {
        default: "bg-border",
        glass: "bg-gradient-to-r from-transparent via-black/20 to-transparent dark:via-white/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof separatorVariants> {
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
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

export { Separator }