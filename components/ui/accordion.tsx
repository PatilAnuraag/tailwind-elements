import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

type AccordionVariant = "default" | "boxed" | "neobrutalism";

const AccordionContext = React.createContext<{
  value: string | string[] | undefined;
  onValueChange: (value: string) => void;
  variant: AccordionVariant;
} | null>(null);

const Accordion = ({
  children,
  className,
  type = "single",
  collapsible = false,
  variant = "default",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  type?: "single" | "multiple";
  collapsible?: boolean;
  variant?: AccordionVariant;
}) => {
  const [value, setValue] = React.useState<string | string[]>(type === "multiple" ? [] : "");

  const handleValueChange = (newValue: string) => {
    if (type === "multiple") {
        setValue((prev) => {
            const current = Array.isArray(prev) ? prev : [];
            return current.includes(newValue) 
                ? current.filter(v => v !== newValue)
                : [...current, newValue];
        });
    } else {
        setValue(prev => (prev === newValue && collapsible ? "" : newValue));
    }
  };

  const ref = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          const triggers = Array.from(ref.current?.querySelectorAll('[data-accordion-trigger]') || []);
          const index = triggers.indexOf(document.activeElement as Element);
          if (index === -1) return;
          
          let nextIndex = index;
          if (e.key === 'ArrowDown') {
               nextIndex = (index + 1) % triggers.length;
          } else {
               nextIndex = (index - 1 + triggers.length) % triggers.length;
          }
          
          e.preventDefault();
          (triggers[nextIndex] as HTMLElement).focus();
      }
  };

  return (
    <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, variant }}>
      <div 
        ref={ref} 
        onKeyDown={handleKeyDown} 
        className={cn(
            variant === "boxed" || variant === "neobrutalism" ? "space-y-2" : "", 
            className
        )} 
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionItemContext = React.createContext<{ value: string } | null>(null);

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const rootContext = React.useContext(AccordionContext);
  const variant = rootContext?.variant || "default";

  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div
        ref={ref}
        className={cn(
          variant === "default" && "border-b",
          variant === "boxed" && "border rounded-lg bg-card px-4",
          variant === "neobrutalism" && "border-2 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const rootContext = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!rootContext || !itemContext) throw new Error("AccordionTrigger used outside Accordion");

  const isOpen = Array.isArray(rootContext.value) 
    ? rootContext.value.includes(itemContext.value)
    : rootContext.value === itemContext.value;

  return (
    <div className="flex">
      <button
        ref={ref}
        type="button"
        data-accordion-trigger
        onClick={(e) => {
          rootContext.onValueChange(itemContext.value);
          onClick?.(e);
        }}
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </div>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const rootContext = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);
  
  if (!rootContext || !itemContext) throw new Error("AccordionContent used outside Accordion");

  const isOpen = Array.isArray(rootContext.value) 
    ? rootContext.value.includes(itemContext.value)
    : rootContext.value === itemContext.value;

  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
      style={{ display: "grid" }}
    >
      <div
        ref={ref}
        className={cn("min-h-0 pb-4 pt-0", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };