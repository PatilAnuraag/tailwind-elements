# Tailwind Elements

A high-quality, accessible component library built with **pure React** and **Tailwind CSS**. 

This project demonstrates a robust design system that balances accessibility (WAI-ARIA standards) with modern aesthetic trends like Neobrutalism, without relying on heavy third-party headless libraries.

[**View Source on GitHub**](https://github.com/PatilAnuraag/tailwind-elements)

## Features

- **Zero Heavy Dependencies**: Built with standard React hooks (`useState`, `useContext`, `useRef`) and DOM elements. No Radix UI or Headless UI required.
- **Accessible**: Follows WAI-ARIA design patterns for keyboard navigation, focus management, and screen reader support.
- **Themable**: Built on a scalable CSS Variable token system supporting **Dark Mode** out of the box.
- **Rich Variant System**: Every component comes with multiple pre-built styles:
  - **Default**: Clean, modern look.
  - **Neobrutalism**: High contrast, hard borders, and deep shadows.
  - **Shine/Gradient**: Animated effects for high-impact actions.
  - **Material**: Minimalist field styles.

## Components

The library includes a comprehensive suite of UI primitives:

- **Actions**: Button, Toggle, Switch
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Slider, Form Layout
- **Feedback**: Alert, Badge, Skeleton, Progress (via Shine)
- **Overlay**: Dialog (Modal), Popover
- **Layout**: Card, Separator
- **Navigation**: Tabs, Accordion
- **Data Display**: Avatar

## Installation

This is a **copy-paste** library (similar to shadcn/ui philosophy), not an npm package. You own the code.

1. **Setup Tailwind CSS**: Ensure you have Tailwind CSS installed in your React project.
2. **Add Utility Helper**: Create `lib/utils.ts` for class merging.
   ```ts
   import { type ClassValue, clsx } from "clsx";
   import { twMerge } from "tailwind-merge";

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```
3. **Configure Tailwind**: Add the necessary animations and colors to your `tailwind.config.js` (see `index.html` for the reference configuration).
4. **Copy Components**: Copy the component files from `components/ui` into your project.

## Usage Example

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Example() {
  return (
    <Card variant="neobrutalism">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">This is a neobrutalist card.</p>
        <Button variant="shine">Click Me</Button>
      </CardContent>
    </Card>
  )
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request on [GitHub](https://github.com/PatilAnuraag/tailwind-elements).

## License

MIT
