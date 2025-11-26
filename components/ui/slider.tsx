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

    // Refs to track state inside event listeners without re-binding
    const valueRef = React.useRef(value)
    const activeThumbIndex = React.useRef<number>(0)
    const sliderRef = React.useRef<HTMLDivElement>(null)
    const isDragging = React.useRef(false)

    React.useLayoutEffect(() => {
        valueRef.current = value
    })

    const handleValueChange = React.useCallback((newValue: number[]) => {
      if (!isControlled) setLocalValue(newValue)
      onValueChange?.(newValue)
    }, [isControlled, onValueChange])

    // Helper to calculate value from mouse position
    const getValueFromPointer = React.useCallback((clientX: number) => {
      if (!sliderRef.current) return min
      const rect = sliderRef.current.getBoundingClientRect()
      const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
      const rawValue = min + percentage * (max - min)
      // Round to nearest step
      const steppedValue = Math.round(rawValue / step) * step
      // Clamp
      return Math.min(Math.max(steppedValue, min), max)
    }, [min, max, step])

    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return
        
        const newValue = getValueFromPointer(e.clientX)
        const currentValues = valueRef.current
        const nextValues = [...currentValues]
        
        // Update the active thumb
        nextValues[activeThumbIndex.current] = newValue
        
        // Optional: Sort values to prevent crossover visual glitches if desired
        // nextValues.sort((a, b) => a - b)
        
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
    }, [getValueFromPointer, handleValueChange])

    const handleMouseDown = (e: React.MouseEvent) => {
      isDragging.current = true
      document.body.style.userSelect = "none"
      const newValue = getValueFromPointer(e.clientX)
      
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
      
      activeThumbIndex.current = closestIndex;

      const nextValues = [...value]
      nextValues[closestIndex] = newValue;
      handleValueChange(nextValues)
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      const currentValue = value[index]
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
      e.stopPropagation()
      
      const nextValues = [...value]
      nextValues[index] = newValue
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
               )}
               style={{ width: `${((value[0] - min) / (max - min)) * 100}%` }}
             />
           ) : (
             <div
               className={cn(
                   "absolute h-full bg-primary",
                   variant === "neobrutalism" && "bg-foreground",
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
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onMouseDown={(e) => { 
                        e.stopPropagation(); // Prevent double trigger from track click
                        isDragging.current = true; 
                        activeThumbIndex.current = index;
                        document.body.style.userSelect = "none"; 
                    }}
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