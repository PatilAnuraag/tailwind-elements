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
3. **Configure Tailwind**: Add the necessary animations and colors to your `tailwind.config.js`.
4. **Copy Components**: Copy the component files from `components/ui` into your project.

---

## Component Reference

### Button
Supports various visual styles, sizes, and shapes.

```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="neobrutalism">Neobrutalism</Button>
<Button variant="shine">Shine Effect</Button>
<Button size="sm">Small</Button>
<Button shape="pill">Pill Shape</Button>
<Button isLoading>Loading...</Button>
```

### Alert
Callouts for user attention.

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Your session has expired.</AlertDescription>
</Alert>

<Alert variant="left-accent">
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>This is a left-accented alert.</AlertDescription>
</Alert>
```

### Badge
Status indicators and tags.

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="soft-warning">Soft Warning</Badge>
<Badge variant="neobrutalism">Neobrutalism</Badge>
```

### Card
Container for grouping content.

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

<Card variant="neobrutalism">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Footer</p>
  </CardFooter>
</Card>
```

### Input & Textarea
Form fields with different visual styles.

```tsx
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

<Input placeholder="Default" />
<Input variant="filled" placeholder="Filled" />
<Input variant="material" placeholder="Material (Bottom Border)" />
<Input variant="neobrutalism" placeholder="Neobrutalism" />

<Textarea placeholder="Type your message here." />
```

### Select
Accessible dropdown menu.

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
```

### Checkbox & Switch
Toggles and selection controls.

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms</label>
</div>

<div className="flex items-center gap-2">
  <Switch id="airplane-mode" />
  <label htmlFor="airplane-mode">Airplane Mode</label>
</div>
```

### Slider
Range input.

```tsx
import { Slider } from "@/components/ui/slider"

{/* Single Thumb */}
<Slider defaultValue={[50]} max={100} step={1} />

{/* Range (Two Thumbs) */}
<Slider defaultValue={[25, 75]} max={100} step={1} />

{/* Neobrutalism Variant */}
<Slider variant="neobrutalism" defaultValue={[50]} />
```

### Dialog (Modal)
 accessible modal dialog.

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
    </DialogHeader>
    <p>Make changes to your profile here.</p>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Sheet (Drawer)
Side drawer component.

```tsx
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger>Open Sheet</SheetTrigger>
  <SheetContent side="right">
    <h2>Sheet Content</h2>
  </SheetContent>
</Sheet>
```

### Accordion
Expandable content sections.

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Tabs
Tabbed interface.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings.</TabsContent>
  <TabsContent value="password">Password settings.</TabsContent>
</Tabs>
```

### Toast
Notifications.

```tsx
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Add <Toaster /> to your app root.

export function ToastDemo() {
  const { toast } = useToast()
  
  return (
    <Button onClick={() => toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2024 at 5:57 PM",
    })}>
      Show Toast
    </Button>
  )
}
```

### Table
Responsive data table.

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Input OTP
One-time password input.

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

## License

MIT
