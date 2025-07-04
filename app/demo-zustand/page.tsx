"use client";

import { SearchInput } from "@/components/common/search-input";
import { Flashcard } from "@/components/flashcard/flashcard";
import {
    FlashList,
    FlashListContainer,
    FlashcardListItem,
} from "@/components/flashcard/flashcard-list";
import { NewFlashcard } from "@/components/flashcard/new-flashcard";
import { useFlashcards } from "@/hooks/zustand/useFlashcards";
import { AppBreadcrumb } from "@/components/common/app-breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "@/components/common/alert";
import { AlertCircle } from "lucide-react";
import { Text } from "@/components/common/text";

export default function DemoZustand() {
  const store = useFlashcards();

  return (
    <div className="p-4 w-full">
      <AppBreadcrumb
        routes={[{ href: "/demo-zustand", label: "Demo Zustand" }]}
      />

      <Text variant="heading" asChild>
        <h1>Flashcards</h1>
      </Text>
      <Text variant="subheading">
        Demo page with Zustand store.
      </Text>

      <FlashListContainer className="mt-4">
        <SearchInput
          id="text-filter"
          placeholder="Search flashcards"
          value={store.textFilter}
          onChange={(e) => store.setTextFilter(e.target.value)}
        />

        {store.error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>{store.error}</AlertDescription>
          </Alert>
        )}

        <FlashList>
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
      </FlashListContainer>
    </div>
  );
}
