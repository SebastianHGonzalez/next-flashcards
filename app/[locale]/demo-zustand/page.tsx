"use client";

import { useTranslations } from "next-intl";
import { SearchInput } from "@/components/common/search-input";
import { Flashcard } from "@/components/flashcard/flashcard";
import {
  FlashList,
  FlashcardListEmpty,
  FlashcardListItem,
  FlashcardListNoMatches,
} from "@/components/flashcard/flashcard-list";
import { NewFlashcard } from "@/components/flashcard/new-flashcard";
import { useFlashcards } from "@/hooks/zustand/useFlashcards";
import { AppBreadcrumb } from "@/components/common/app-breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "@/components/common/alert";
import { AlertCircle } from "lucide-react";
import { Text } from "@/components/common/text";
import { ActivityIndicator } from "@/components/common/activity-indicator";
import { Button } from "@/components/common/button";

export default function DemoZustand() {
  const store = useFlashcards();
  const t = useTranslations();

  return (
    <div className="p-4 w-full">
      <AppBreadcrumb
        routes={[{ href: "/demo-zustand", label: t("navigation.demoZustand") }]}
      />

      <Text variant="heading" asChild>
        <h1>{t("flashcards.title")}</h1>
      </Text>
      <Text variant="subheading">{t("flashcards.subtitle")}</Text>

      <SearchInput
        className="mt-6"
        id="text-filter"
        placeholder={t("common.searchPlaceholder")}
        value={store.textFilter}
        onChange={(e) => store.setTextFilter(e.target.value)}
      />

      {store.error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle />
          <AlertTitle>{t("alerts.headsUp")}</AlertTitle>
          <AlertDescription>{store.error}</AlertDescription>
        </Alert>
      )}

      {store.loading && <ActivityIndicator size={150} className="mt-4" />}

      {!store.loading && store.flashcards.length > 0 && (
        <FlashList className="mt-4">
          {store.flashcards.map((flashcard) => (
            <FlashcardListItem key={flashcard.id}>
              <Flashcard
                flashcard={flashcard}
                onUpdate={store.updateFlashcard}
                onDelete={store.deleteFlashcard}
              />
            </FlashcardListItem>
          ))}
          <FlashcardListItem>
            <NewFlashcard onAdd={store.addFlashcard} />
          </FlashcardListItem>
        </FlashList>
      )}

      {!store.loading && !store.flashcardsCount && (
        <FlashcardListEmpty>
          <NewFlashcard onAdd={store.addFlashcard} />
        </FlashcardListEmpty>
      )}

      {!store.loading &&
        !!store.flashcardsCount &&
        store.flashcards.length === 0 &&
        !!store.textFilter && (
          <FlashcardListNoMatches>
            <Button
              variant="outline"
              size="sm"
              onClick={() => store.setTextFilter("")}
            >
              {t("flashcards.clearFilters")}
            </Button>
          </FlashcardListNoMatches>
        )}
    </div>
  );
}
