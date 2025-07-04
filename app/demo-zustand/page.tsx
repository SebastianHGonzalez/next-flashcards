"use client";

import { useState } from "react";
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

export default function DemoZustand() {
  const flashcardStore = useFlashcards();
  const [textFilter, setTextFilter] = useState("");

  return (
    <div className="p-4 w-full">
      <AppBreadcrumb
        routes={[{ href: "/demo-zustand", label: "Demo Zustand" }]}
      />

      <FlashListContainer>
        <SearchInput
          id="text-filter"
          value={textFilter}
          onChange={(e) => setTextFilter(e.target.value)}
        />

        <FlashList>
          {flashcardStore.flashcards.map((flashcard) => (
            <FlashcardListItem key={flashcard.id}>
              <Flashcard
                flashcard={flashcard}
                onUpdate={flashcardStore.update}
                onDelete={flashcardStore.delete}
              />
            </FlashcardListItem>
          ))}
          <FlashcardListItem className="col-span-full">
            <NewFlashcard onAdd={flashcardStore.add} />
          </FlashcardListItem>
        </FlashList>
      </FlashListContainer>
    </div>
  );
}
