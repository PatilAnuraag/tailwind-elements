import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted focus-visible:bg-transparent focus-visible:border-input",
        flushed: "rounded-none border-x-0 border-t-0 border-b px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary",
        neobrutalism: "border-2 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
        glass: "bg-black/5 border-black/10 text-foreground placeholder:text-muted-foreground focus-visible:border-black/20 focus-visible:ring-black/5 dark:bg-black/20 dark:border-white/10 dark:placeholder:text-white/40 dark:text-white dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }