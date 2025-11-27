import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

// Simple tooltip implementation without external positioning libraries
const TooltipContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
} | null>(null)

const TooltipProvider = ({ children }: { children?: React.ReactNode }) => {
  return <>{children}</>
}

const Tooltip = ({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = (newValue: boolean) => {
    if (!isControlled) setInternalOpen(newValue)
    onOpenChange?.(newValue)
  }

  return (
    <TooltipContext.Provider value={{ open: !!open, setOpen }}>
      <div 
        className="relative inline-block group"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  )
}

const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, children, asChild, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, { ...props })
  }
  return (
    <button ref={ref} className={className} {...props}>
      {children}
    </button>
  )
})
TooltipTrigger.displayName = "TooltipTrigger"

const tooltipContentVariants = cva(
  "absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 whitespace-nowrap",
  {
    variants: {
        side: {
            top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
            bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
            left: "right-full top-1/2 -translate-y-1/2 mr-2",
            right: "left-full top-1/2 -translate-y-1/2 ml-2",
        },
        variant: {
            default: "",
            neobrutalism: "rounded-none border-2 border-foreground bg-foreground text-background shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        }
    },
    defaultVariants: {
      side: "top",
      variant: "default",
    },
  }
)

type TooltipContentProps = React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof tooltipContentVariants>

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", variant, ...props }, ref) => {
    const context = React.useContext(TooltipContext)
    if (!context?.open) return null

    return (
      <div
        ref={ref}
        data-side={side}
        className={cn(tooltipContentVariants({ side, variant, className }))}
        {...props}
      />
    )
  }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }