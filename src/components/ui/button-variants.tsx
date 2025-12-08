import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lime hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-foreground bg-transparent hover:bg-foreground hover:text-background",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        lime: "bg-lime text-foreground hover:shadow-lime hover:scale-105 font-semibold",
        dark: "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105",
        hero: "bg-card text-foreground border-2 border-foreground hover:bg-foreground hover:text-card font-semibold",
        heroFilled: "bg-foreground text-card hover:bg-foreground/90 hover:scale-105 font-semibold",
        premium: "bg-gradient-to-r from-lime to-mint text-foreground hover:shadow-lime hover:scale-105 font-semibold",
        glass: "bg-card/20 backdrop-blur-md border border-border/50 text-foreground hover:bg-card/30",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-full px-4",
        lg: "h-12 rounded-full px-8 text-base",
        xl: "h-14 rounded-full px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
