import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export function FlashListContainer({
  children,
  className,
  asChild,
}: {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}) {
  const Component = asChild ? Slot : "div";

  return (
    <Component className={cn("flex flex-col gap-4", className)}>
      {children}
    </Component>
  );
}

export function FlashList({
  children,
  className,
  asChild,
}: {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}) {
  const Component = asChild ? Slot : "ul";

  return (
    <Component
      className={cn(
        `grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]`,
        className
      )}
    >
      {children}
    </Component>
  );
}

export function FlashcardListItem({
  children,
  className,
  asChild,
}: {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}) {
  const Component = asChild ? Slot : "li";

  return (
    <Component className={cn(className)}>{children}</Component>
  );
}
