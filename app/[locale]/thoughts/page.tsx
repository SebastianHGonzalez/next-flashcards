"use client";

import { useTranslations } from "next-intl";
import { useFlashcards } from "@/hooks/zustand/useFlashcards";
import { AppBreadcrumb } from "@/components/common/app-breadcrumb";
import { Text } from "@/components/common/text";
import { FlashcardsPage } from "@/components/flashcard/flashcards-page";

export default function ThoughtsPage() {
  const store = useFlashcards();
  const t = useTranslations();

  return (
    <div className="p-4 w-full">
      <AppBreadcrumb
        routes={[{ href: "/thoughts", label: t("navigation.thoughts") }]}
      />

      <Text variant="heading" asChild>
        <h1>{t("flashcards.title")}</h1>
      </Text>
      <Text variant="subheading">{t("flashcards.subtitle")}</Text>

      <FlashcardsPage store={store} />
    </div>
  );
}
