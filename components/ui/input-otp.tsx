import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const inputOTPVariants = cva(
  "flex items-center gap-2",
  {
    variants: {
      variant: {
        default: "",
        neobrutalism: "",
        separated: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const slotVariants = cva(
  "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md focus:relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        neobrutalism: "rounded-none border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none bg-background",
        separated: "rounded-md border border-input focus:ring-2 focus:ring-ring focus:ring-offset-2 mx-1"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface InputOTPContextType {
    slots: string[]
    setSlots: React.Dispatch<React.SetStateAction<string[]>>
    activeIndex: number
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>
    variant?: "default" | "neobrutalism" | "separated"
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

const InputOTPContext = React.createContext<InputOTPContextType | null>(null)

type InputOTPProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & VariantProps<typeof inputOTPVariants> & {
    maxLength?: number
    value?: string
    onChange?: (value: string) => void
    disabled?: boolean
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, maxLength = 6, value, onChange, variant, disabled, ...props }, ref) => {
    const [slots, setSlots] = React.useState<string[]>(new Array(maxLength).fill(""))
    const [activeIndex, setActiveIndex] = React.useState<number>(0)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Sync external value
    React.useEffect(() => {
        if (value !== undefined) {
             const newSlots = value.split("").slice(0, maxLength)
             // Fill remaining
             while (newSlots.length < maxLength) newSlots.push("")
             setSlots(newSlots)
        }
    }, [value, maxLength])

    // Focus active slot logic
    React.useEffect(() => {
        if (disabled) return
        const inputs = containerRef.current?.querySelectorAll("input")
        if (inputs && inputs[activeIndex]) {
            inputs[activeIndex].focus()
        }
    }, [activeIndex, disabled])

    const updateSlots = (newSlots: string[]) => {
        setSlots(newSlots)
        onChange?.(newSlots.join(""))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
             e.preventDefault()
             const newSlots = [...slots]
             if (newSlots[index]) {
                 newSlots[index] = ""
                 updateSlots(newSlots)
             } else if (index > 0) {
                 newSlots[index - 1] = ""
                 updateSlots(newSlots)
                 setActiveIndex(index - 1)
             }
        } else if (e.key === "ArrowLeft") {
             e.preventDefault()
             if (index > 0) setActiveIndex(index - 1)
        } else if (e.key === "ArrowRight") {
             e.preventDefault()
             if (index < maxLength - 1) setActiveIndex(index + 1)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
         const val = e.target.value
         if (!val) return

         const lastChar = val.slice(-1)
         const newSlots = [...slots]
         newSlots[index] = lastChar
         updateSlots(newSlots)

         if (index < maxLength - 1) {
             setActiveIndex(index + 1)
         }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData("text").slice(0, maxLength).split("")
        const newSlots = [...slots]
        pasted.forEach((char, i) => {
             if (i < maxLength) newSlots[i] = char
        })
        updateSlots(newSlots)
        setActiveIndex(Math.min(pasted.length, maxLength - 1))
    }

    return (
      <InputOTPContext.Provider value={{ slots, setSlots, activeIndex, setActiveIndex, variant: variant as any, handleKeyDown, handleChange }}>
        <div
          ref={containerRef} // Use local ref for focus management
          className={cn(inputOTPVariants({ variant, className }))}
          onPaste={handlePaste}
          {...props}
        >
             {props.children}
        </div>
      </InputOTPContext.Provider>
    )
  }
)
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { index: number } & VariantProps<typeof slotVariants>
>(({ index, className, ...props }, ref) => {
  const context = React.useContext(InputOTPContext)
  if (!context) throw new Error("InputOTPSlot must be used within InputOTP")
  
  const { slots, activeIndex, variant, handleKeyDown, handleChange } = context

  return (
    <div
      className={cn(
        slotVariants({ variant }),
        activeIndex === index && "ring-2 ring-ring ring-offset-background z-10",
        className
      )}
    >
        <input 
            className="w-full h-full text-center bg-transparent outline-none cursor-default"
            value={slots[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            type="text" 
            inputMode="numeric"
            ref={ref}
        />
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <div className="h-1 w-1 rounded-full bg-foreground mx-1" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
