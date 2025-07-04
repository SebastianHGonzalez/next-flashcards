import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

const textVariants = cva("text-sm text-muted-foreground", {
  variants: {
    variant: {
      heading: "text-2xl font-bold text-foreground mt-4",
      subheading: "text-lg font-semibold text-muted-foreground",
      default: "text-sm text-muted-foreground mt-2",
    },
  },
});

type TextProps = {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
} & React.ComponentProps<"p"> &
  VariantProps<typeof textVariants>;

export function Text({
  children,
  className,
  asChild,
  variant,
...props
}: TextProps) {
  const Component = asChild ? Slot : "p";

  return (
    <Component className={cn(textVariants({ variant, className }))} {...props}>
      {children}
    </Component>
  );
}
