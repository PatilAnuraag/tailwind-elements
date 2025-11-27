import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const progressVariants = cva(
  "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      variant: {
        default: "",
        neobrutalism: "rounded-none border-2 border-foreground bg-background h-5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ProgressProps = React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof progressVariants> & {
  value?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className={cn(progressVariants({ variant, className }))}
        {...props}
      >
        <div
          className={cn(
            "h-full w-full flex-1 bg-primary transition-all duration-500 ease-in-out",
            variant === "neobrutalism" && "bg-foreground border-r-2 border-foreground"
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress, progressVariants }