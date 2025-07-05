import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Text } from "@/components/common/text";

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
        "grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]",
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

  return <Component className={cn(className)}>{children}</Component>;
}

export function FlashcardListEmpty({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const t = useTranslations("flashcards");

  return (
    <FlashcardListEmptyBase
      title={t("emptyState.title")}
      description={t("emptyState.description")}
      image={
        <Image
          src="/undraw_things-to-say_f5mi.svg"
          alt={t("emptyState.title")}
          width={200}
          height={200}
        />
      }
      className={className}
    >
      {children}
    </FlashcardListEmptyBase>
  );
}

export function FlashcardListNoMatches({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const t = useTranslations("flashcards");

  return (
    <FlashcardListEmptyBase
      title={t("noMatches.title")}
      description={t("noMatches.description")}
      image={
        <Image
          src="/undraw_file-search_cbur.svg"
          alt={t("noMatches.title")}
          width={200}
          height={200}
        />
      }
      className={className}
    >
      {children}
    </FlashcardListEmptyBase>
  );
}

function FlashcardListEmptyBase({
  title,
  description,
  image,
  className,
  children,
}: {
  title: string;
  description: string;
  image: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row justify-center items-center md:items-start gap-8 mt-8",
        className
      )}
    >
      {image}

      <div className="flex-basis-[300px] flex-shrink-0 flex flex-col items-center md:items-start">
        <Text className="text-center md:text-left mt-2" variant="body">{title}</Text>
        <Text className="text-center md:text-left mt-1 mb-4" variant="bodyMuted">{description}</Text>
        <div className="w-full">
        {children}
        </div>
      </div>
    </div>
  );
}
