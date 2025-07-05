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
import { Alert, AlertDescription, AlertTitle } from "@/components/common/alert";
import { AlertCircle } from "lucide-react";
import { ActivityIndicator } from "@/components/common/activity-indicator";
import { Button } from "@/components/common/button";
import { FlashcardsStore } from "@/model/flashcard";

export function FlashcardsPage({ store }: { store: FlashcardsStore }) {
  const t = useTranslations("flashcards-page");

  return (
    <>
      <SearchInput
        className="mt-6"
        id="text-filter"
        placeholder={t("search.placeholder")}
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
              className="w-full"
              onClick={() => store.setTextFilter("")}
            >
              {t("clearFilters")}
            </Button>
          </FlashcardListNoMatches>
        )}
    </>
  );
}
