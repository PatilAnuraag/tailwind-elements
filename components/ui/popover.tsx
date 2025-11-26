import * as React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const PopoverContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
} | null>(null)

const Popover = ({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = (newValue: boolean) => {
    if (!isControlled) setInternalOpen(newValue)
    onOpenChange?.(newValue)
  }

  const popoverRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <PopoverContext.Provider value={{ open: !!open, setOpen }}>
      <div ref={popoverRef} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, onClick, children, asChild, ...props }, ref) => {
  const context = React.useContext(PopoverContext)
  if (!context) throw new Error("PopoverTrigger must be used within Popover")

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    context.setOpen(!context.open)
    onClick?.(e)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
      ...props,
    })
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

const popoverContentVariants = cva(
  "absolute z-50 w-72 p-4 outline-none animate-fade-in data-[side=bottom]:slide-in-from-top-2",
  {
    variants: {
      variant: {
        default: "rounded-md border bg-popover text-popover-foreground shadow-md",
        neobrutalism: "rounded-none border-2 border-foreground bg-background text-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        glass: "rounded-xl border border-black/5 bg-white/80 text-foreground backdrop-blur-2xl shadow-lg ring-1 ring-black/5 dark:border-white/20 dark:bg-gradient-to-br dark:from-violet-500/30 dark:via-purple-500/30 dark:to-fuchsia-500/30 dark:shadow-[0_0_30px_0_rgba(139,92,246,0.3)] dark:ring-white/30 dark:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface PopoverContentProps 
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof popoverContentVariants> {
  align?: "center" | "start" | "end"
  sideOffset?: number
}

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, variant, ...props }, ref) => {
  const context = React.useContext(PopoverContext)
  if (!context) throw new Error("PopoverContent must be used within Popover")

  if (!context.open) return null

  return (
    <div
      ref={ref}
      className={cn(popoverContentVariants({ variant, className }))}
      style={{
        top: `calc(100% + ${sideOffset}px)`,
        left: align === "center" ? "50%" : align === "start" ? "0" : "auto",
        right: align === "end" ? "0" : "auto",
        transform: align === "center" ? "translateX(-50%)" : "none",
      }}
      {...props}
    />
  )
})
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }