import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        neobrutalism: "rounded-none border-2 border-foreground dark:border-white",
      },
      checked: {
        true: "bg-primary",
        false: "bg-input",
      },
      size: {
        default: "h-6 w-11",
        sm: "h-5 w-9",
      },
    },
    compoundVariants: [
      {
        variant: "neobrutalism",
        checked: false,
        className: "bg-background",
      },
    ],
    defaultVariants: {
      size: "default",
      checked: false,
      variant: "default",
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      variant: {
        default: "",
        neobrutalism: "rounded-none border border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      },
      checked: {
        true: "",
        false: "translate-x-0",
      },
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
      },
    },
    compoundVariants: [
      {
        checked: true,
        size: "default",
        className: "translate-x-5",
      },
      {
        checked: true,
        size: "sm",
        className: "translate-x-4",
      },
    ],
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export interface SwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof switchVariants> {
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, variant, checked = false, onCheckedChange, onClick, name, value, ...props }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (props.disabled) return;
      onCheckedChange?.(!checked);
      onClick?.(event);
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        className={cn(switchVariants({ size, checked, variant, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        <span className={cn(thumbVariants({ size, checked, variant }))} />
        {name && <input type="checkbox" className="hidden" name={name} value={value} checked={checked} readOnly />}
      </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };