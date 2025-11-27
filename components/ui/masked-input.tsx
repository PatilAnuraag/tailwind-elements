import * as React from "react"
import { Input, InputProps } from "./input"

export type MaskedInputProps = InputProps & {
  mask: string // e.g., "(999) 999-9999" where 9=digit, a=alpha, *=alnum
}

/**
 * A simple masked input component.
 * 
 * Mask Definitions:
 * 9: Numeric (0-9)
 * a: Alphabetical (a-z, A-Z)
 * *: Alphanumeric (0-9, a-z, A-Z)
 * Any other character is treated as a literal.
 */
export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, value: controlledValue, onChange, className, ...props }, ref) => {
    // Determine if controlled or uncontrolled
    const isControlled = controlledValue !== undefined
    const [internalValue, setInternalValue] = React.useState(
      (props.defaultValue as string) || ""
    )
    
    // Use the appropriate value
    const value = isControlled ? (controlledValue as string) : internalValue

    // Helper to format a raw value against the mask
    const format = React.useCallback((val: string) => {
      let maskIdx = 0
      let valIdx = 0
      let result = ""
      
      // 1. Strip characters that don't belong in the "raw" input?
      // Simple approach: Strip non-alphanumeric chars from value to get raw stream
      // Then re-inject them based on mask.
      // This works for typical masks (Phone, Date, CC) where literals are symbols.
      const raw = val.replace(/[^0-9a-z]/gi, "")

      while (maskIdx < mask.length && valIdx < raw.length) {
        const maskChar = mask[maskIdx]
        const valChar = raw[valIdx]

        if (maskChar === "9") {
          if (/[0-9]/.test(valChar)) {
            result += valChar
            valIdx++
            maskIdx++
          } else {
            valIdx++ // Skip invalid char
          }
        } else if (maskChar === "a") {
          if (/[a-z]/i.test(valChar)) {
            result += valChar
            valIdx++
            maskIdx++
          } else {
            valIdx++
          }
        } else if (maskChar === "*") {
          if (/[0-9a-z]/i.test(valChar)) {
            result += valChar
            valIdx++
            maskIdx++
          } else {
            valIdx++
          }
        } else {
          // Literal char in mask (e.g., '(', '-', ' ')
          result += maskChar
          maskIdx++
          // If the user typed this char explicitly, consume it from raw
          // But since we stripped raw, we don't need to consume it.
          // However, we just append it to result.
        }
      }
      
      return result
    }, [mask])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // 1. Get the new value
      const newVal = e.target.value
      
      // 2. Format it
      // To handle backspace better, we might want to check if length decreased.
      // But for simple "format as you type", strictly applying format fn is usually mostly ok for a showcase.
      
      // Optimization: if the user is deleting, the raw value shrinks, format rebuilds correctly.
      // If user is adding, raw value grows, format rebuilds correctly.
      
      const formatted = format(newVal)

      // 3. Update state / trigger onChange
      if (!isControlled) {
        setInternalValue(formatted)
      }
      
      // Create a synthetic event with the formatted value to pass back
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: formatted,
          name: e.target.name,
        }
      } as React.ChangeEvent<HTMLInputElement>

      onChange?.(syntheticEvent)
    }

    return (
      <Input
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
        className={className}
      />
    )
  }
)
MaskedInput.displayName = "MaskedInput"