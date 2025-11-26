import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Context
type SelectContextType = {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  labelMap: React.MutableRefObject<Map<string, React.ReactNode>>;
  notifyUpdate: () => void;
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  itemsRef: React.MutableRefObject<Map<string, HTMLDivElement>>;
  variant: "default" | "neobrutalism";
};

const SelectContext = React.createContext<SelectContextType | null>(null);

const useSelect = () => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("Select components must be used within Select");
  return context;
};

// Root
interface SelectProps {
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  name?: string;
}

const Select = ({
  children,
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  defaultValue,
  name,
}: SelectProps) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
  const [open, setOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const labelMap = React.useRef(new Map<string, React.ReactNode>());
  const itemsRef = React.useRef(new Map<string, HTMLDivElement>());
  
  // State to hold variant from trigger to pass to content
  const [variant, setVariant] = React.useState<"default" | "neobrutalism">("default");

  const [_, setUpdateCounter] = React.useState(0);
  const notifyUpdate = React.useCallback(() => setUpdateCounter(c => c + 1), []);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;
  const onValueChange = (newValue: string) => {
    if (!isControlled) setUncontrolledValue(newValue);
    controlledOnValueChange?.(newValue);
  };

  const selectRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  React.useEffect(() => {
    if (!open) setHighlightedIndex(-1);
  }, [open]);

  return (
    <SelectContext.Provider
      value={{ 
        value: value!, 
        onValueChange, 
        open, 
        setOpen, 
        labelMap, 
        notifyUpdate,
        highlightedIndex,
        setHighlightedIndex,
        itemsRef,
        variant
      }}
    >
      <div ref={selectRef} className="relative inline-block w-full">
        {children}
        {name && <input type="hidden" name={name} value={value} />}
      </div>
    </SelectContext.Provider>
  );
};

// Group
const SelectGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full", className)} {...props} />
));
SelectGroup.displayName = "SelectGroup";

// Value
const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { placeholder?: string }
>(({ className, placeholder, ...props }, ref) => {
  const { value, labelMap } = useSelect();
  const displayValue = value ? labelMap.current.get(value) : null;
  
  return (
    <span ref={ref} className={cn("block truncate pointer-events-none", className)} {...props}>
      {displayValue || placeholder || value || <span className="opacity-0">Placeholder</span>}
    </span>
  );
});
SelectValue.displayName = "SelectValue";

// Trigger
const selectTriggerVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        neobrutalism: "border-2 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SelectTriggerProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, variant, ...props }, ref) => {
  const { open, setOpen } = useSelect();
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setOpen(!open)}
      onKeyDown={handleKeyDown}
      aria-expanded={open}
      aria-haspopup="listbox"
      className={cn(selectTriggerVariants({ variant, className }))}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

// Content
const selectContentVariants = cva(
  "absolute z-50 mt-1 max-h-96 w-full min-w-[8rem] overflow-hidden rounded-md border text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2",
  {
    variants: {
      variant: {
        default: "bg-popover",
        neobrutalism: "border-2 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SelectContentProps 
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof selectContentVariants> {}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, variant, ...props }, ref) => {
  const { open, setOpen, highlightedIndex, setHighlightedIndex, itemsRef, onValueChange, value } = useSelect();
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => contentRef.current!);

  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const items = Array.from(itemsRef.current.values() as Iterable<HTMLDivElement>).filter(el => !el.hasAttribute('disabled'));
      
      switch(e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < items.length) {
            const item = items[highlightedIndex];
            const value = item.getAttribute('data-value');
            if (value) {
              onValueChange(value);
              setOpen(false);
            }
          }
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, highlightedIndex, itemsRef, onValueChange, setHighlightedIndex, setOpen]);

  React.useEffect(() => {
    if (open && highlightedIndex >= 0 && contentRef.current) {
        const items = Array.from(itemsRef.current.values() as Iterable<HTMLDivElement>).filter(el => !el.hasAttribute('disabled'));
        const item = items[highlightedIndex];
        if (item) {
            item.scrollIntoView({ block: 'nearest' });
        }
    }
  }, [open, highlightedIndex]);

  return (
    <div
      ref={contentRef}
      className={cn(
        selectContentVariants({ variant, className }),
        open ? "animate-fade-in" : "hidden"
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  );
});
SelectContent.displayName = "SelectContent";

// Label
const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

// Item
interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value: itemValue, disabled, ...props }, ref) => {
    const { value, onValueChange, setOpen, labelMap, notifyUpdate, itemsRef, highlightedIndex } = useSelect();
    const itemRef = React.useRef<HTMLDivElement>(null);
    
    React.useLayoutEffect(() => {
        if (!labelMap.current.has(itemValue)) {
            labelMap.current.set(itemValue, children);
            notifyUpdate();
        }
        
        const currentRef = itemRef.current;
        if (currentRef) {
            itemsRef.current.set(itemValue, currentRef);
        }

        return () => {
             itemsRef.current.delete(itemValue);
        };
    }, [itemValue, children, labelMap, notifyUpdate, itemsRef]);

    const isSelected = value === itemValue;
    const index = Array.from(itemsRef.current.keys()).indexOf(itemValue);
    const isHighlighted = index === highlightedIndex;

    return (
      <div
        ref={itemRef}
        role="option"
        aria-selected={isSelected}
        data-value={itemValue}
        aria-disabled={disabled}
        onClick={() => {
          if (disabled) return;
          onValueChange(itemValue);
          setOpen(false);
        }}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          isSelected && "font-medium",
          isHighlighted ? "bg-accent text-accent-foreground" : "text-popover-foreground",
          className
        )}
        data-disabled={disabled ? "" : undefined}
        {...props}
      >
        {isSelected && (
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <Check className="h-4 w-4" />
          </span>
        )}
        <span>{children}</span>
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};