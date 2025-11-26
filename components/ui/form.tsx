import * as React from "react"
import { Label } from "./label"
import { cn } from "../../lib/utils"

const FormItemContext = React.createContext<{
  id: string
  error?: boolean
}>({ id: "" })

const useFormField = () => {
  const context = React.useContext(FormItemContext)
  if (!context) {
    throw new Error("Form components must be used within a FormItem")
  }
  return context
}

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id, error }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { id, error } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={id}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

// Minimal Slot implementation to merge props onto child
const FormControl = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const { id, error } = useFormField()
  const descriptionId = `${id}-form-item-description`
  const messageId = `${id}-form-item-message`

  if (React.Children.count(props.children) > 1) {
      throw new Error("FormControl can only have one child")
  }

  if (React.isValidElement(props.children)) {
      const child = props.children as React.ReactElement<{ className?: string, [key: string]: any }>;
      const { children, ...rest } = props;

      return React.cloneElement(child, {
          id: id,
          "aria-describedby": error ? `${descriptionId} ${messageId}` : descriptionId,
          "aria-invalid": !!error,
          ...rest,
          ...child.props, // child props take precedence if needed, but usually we want to merge className
          className: cn(rest.className, child.props.className)
      })
  }
  
  return null;
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { id } = useFormField()

  return (
    <p
      ref={ref}
      id={`${id}-form-item-description`}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { id, error } = useFormField()
  const body = error ? String(children) : children

  if (!error && !children) {
    return null
  }

  return (
    <p
      ref={ref}
      id={`${id}-form-item-message`}
      className={cn("text-xs font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}