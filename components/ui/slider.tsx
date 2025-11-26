import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const sliderTrackVariants = cva(
  "relative w-full grow overflow-hidden rounded-full bg-secondary cursor-pointer",
  {
    variants: {
      variant: {
        default: "h-2",
        thick: "h-4",
        neobrutalism: "h-4 rounded-none border-2 border-foreground bg-background",
        glass: "h-2 bg-black/10 border border-black/5 dark:bg-primary/20 dark:border-primary/20 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sliderThumbVariants = cva(
  "absolute block rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:bg-accent",
  {
    variants: {
      variant: {
        default: "h-5 w-5",
        thick: "h-6 w-6 border-4",
        neobrutalism: "h-6 w-6 rounded-none border-2 border-foreground bg-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        glass: "h-5 w-5 border-black/20 bg-primary/80 dark:border-white/40 dark:bg-primary/60 backdrop-blur-md shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SliderProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue">,
    VariantProps<typeof sliderTrackVariants> {
  min?: number
  max?: number
  step?: number
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  name?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, value: controlledValue, defaultValue = [0], onValueChange, name, variant, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(defaultValue)
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue! : localValue

    const handleValueChange = (newValue: number[]) => {
      if (!isControlled) setLocalValue(newValue)
      onValueChange?.(newValue)
    }

    const sliderRef = React.useRef<HTMLDivElement>(null)
    const isDragging = React.useRef(false)

    // Helper to calculate value from mouse position
    const getValueFromPointer = (clientX: number) => {
      if (!sliderRef.current) return value[0]
      const rect = sliderRef.current.getBoundingClientRect()
      const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
      const rawValue = min + percentage * (max - min)
      // Round to nearest step
      const steppedValue = Math.round(rawValue / step) * step
      // Clamp
      return Math.min(Math.max(steppedValue, min), max)
    }

    // Determine closest thumb for multi-range interaction (simplified for single/range)
    
    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return
        const newValue = getValueFromPointer(e.clientX)
        // Simple logic for single thumb or replacing first thumb
        const nextValues = [...value]
        nextValues[0] = newValue
        handleValueChange(nextValues)
      }

      const handleMouseUp = () => {
        isDragging.current = false
        document.body.style.userSelect = ""
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }, [min, max, step, value])

    const handleMouseDown = (e: React.MouseEvent) => {
      isDragging.current = true
      document.body.style.userSelect = "none"
      const newValue = getValueFromPointer(e.clientX)
      const nextValues = [...value]
      
      // Find closest thumb index
      let closestIndex = 0;
      let minDiff = Infinity;
      value.forEach((v, i) => {
          const diff = Math.abs(v - newValue);
          if (diff < minDiff) {
              minDiff = diff;
              closestIndex = i;
          }
      });
      
      nextValues[closestIndex] = newValue;
      handleValueChange(nextValues)
    }

    // Keyboard support - only for first thumb for simplicity in this pure CSS version
    const handleKeyDown = (e: React.KeyboardEvent) => {
      const currentValue = value[0]
      let newValue = currentValue

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          newValue = Math.min(currentValue + step, max)
          break
        case "ArrowLeft":
        case "ArrowDown":
          newValue = Math.max(currentValue - step, min)
          break
        case "Home":
          newValue = min
          break
        case "End":
          newValue = max
          break
        default:
          return
      }
      
      e.preventDefault()
      const nextValues = [...value]
      nextValues[0] = newValue
      handleValueChange(nextValues)
    }

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <div
          ref={sliderRef}
          className={cn(sliderTrackVariants({ variant }))}
          onMouseDown={handleMouseDown}
        >
          {/* Render track segments */}
           {value.length === 1 ? (
             <div
               className={cn(
                   "absolute h-full bg-primary",
                   variant === "neobrutalism" && "bg-foreground",
                   variant === "glass" && "bg-primary/60 dark:bg-primary/40"
               )}
               style={{ width: `${((value[0] - min) / (max - min)) * 100}%` }}
             />
           ) : (
             <div
               className={cn(
                   "absolute h-full bg-primary",
                   variant === "neobrutalism" && "bg-foreground",
                   variant === "glass" && "bg-primary/60 dark:bg-primary/40"
               )}
               style={{ 
                 left: `${((Math.min(...value) - min) / (max - min)) * 100}%`,
                 width: `${((Math.max(...value) - Math.min(...value)) / (max - min)) * 100}%` 
               }}
             />
           )}
        </div>
        
        {value.map((val, index) => {
             const percentage = ((val - min) / (max - min)) * 100
             return (
                 <div
                    key={index}
                    role="slider"
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={val}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    onMouseDown={() => { isDragging.current = true; document.body.style.userSelect = "none"; }}
                    className={cn(sliderThumbVariants({ variant }))}
                    style={{ left: `calc(${percentage}% - ${variant === 'thick' || variant === 'neobrutalism' ? 12 : 10}px)` }}
                />
             )
        })}
        {name && <input type="hidden" name={name} value={value[0]} />}
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider, sliderTrackVariants, sliderThumbVariants }