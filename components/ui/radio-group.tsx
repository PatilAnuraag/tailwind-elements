import * as React from "react"
import { Circle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const radioGroupItemVariants = cva(
  "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        neobrutalism: "rounded-none border-2 border-foreground bg-background shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] data-[state=checked]:shadow-none data-[state=checked]:translate-x-[2px] data-[state=checked]:translate-y-[2px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type RadioGroupContextType = {
  value: string
  onValueChange: (value: string) => void
  variant: "default" | "neobrutalism"
}

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(null)

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    name?: string
    variant?: "default" | "neobrutalism"
  }
>(({ className, children, value: controlledValue, defaultValue, onValueChange, name, variant = "default", ...props }, ref) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "")
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue
  
  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <RadioGroupContext.Provider value={{ value: value!, onValueChange: handleValueChange, variant }}>
      <div className={cn("grid gap-2", className)} role="radiogroup" ref={ref} {...props}>
        {children}
        {name && <input type="hidden" name={name} value={value} />}
      </div>
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof radioGroupItemVariants> {
    value: string
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, value, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext)
  if (!context) throw new Error("RadioGroupItem must be used within RadioGroup")

  const isChecked = context.value === value
  const variant = context.variant

  return (
    <button
      ref={ref}
      role="radio"
      aria-checked={isChecked}
      data-state={isChecked ? "checked" : "unchecked"}
      value={value}
      className={cn(radioGroupItemVariants({ variant, className }))}
      onClick={() => context.onValueChange(value)}
      {...props}
    >
      <span className={cn("flex items-center justify-center", isChecked ? "block" : "hidden")}>
        {variant === "neobrutalism" ? (
             <div className="h-2 w-2 bg-foreground" />
        ) : (
             <Circle className="h-2.5 w-2.5 fill-current text-current" />
        )}
      </span>
    </button>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }