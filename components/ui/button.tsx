import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";

// Button variants without cva dependency
const buttonVariants = (variant: string = "default", size: string = "default") => {
  const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500",
    ghost: "hover:bg-gray-100 text-gray-900 focus-visible:ring-gray-500",
    link: "text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500",
  };
  
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-6",
    icon: "h-9 w-9",
  };
  
  return `${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default}`;
};

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref as any}
        data-slot="button"
        className={cn(buttonVariants(variant, size), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };