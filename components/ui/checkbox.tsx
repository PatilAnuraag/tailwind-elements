import * as React from "react"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  {
    variants: {
      variant: {
        default: "rounded-sm",
        circle: "rounded-full",
        neobrutalism: "rounded-none border-2 border-foreground bg-background text-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] data-[state=checked]:shadow-none data-[state=checked]:translate-x-[2px] data-[state=checked]:translate-y-[2px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type CheckboxProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof checkboxVariants> & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  name?: string
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, variant, checked = false, onCheckedChange, name, value, ...props }, ref) => {
    
    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        ref={ref}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(checkboxVariants({ variant, className }))}
        {...props}
      >
        <span
            className={cn(
                "flex items-center justify-center text-current pointer-events-none",
                checked ? "opacity-100" : "opacity-0"
            )}
        >
          <Check className="h-3 w-3" />
        </span>
        {name && <input type="checkbox" className="hidden" name={name} value={value} checked={checked} readOnly />}
      </button>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox, checkboxVariants }