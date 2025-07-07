"use client";

import {
    createFlashcardSchema,
    deleteFlashcardSchema, FlashcardsStore,
    updateFlashcardSchema
} from "@/model/flashcard";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useMemo } from "react";

export const useFlashcardsStore = create<FlashcardsStore>()(
  devtools(
    persist(
      (set, get) => ({
        allFlashcards: [],
        flashcardsCount: 0,
        flashcards: [],
        loading: true,
        error: null,
        textFilter: "",

        addFlashcard: async (flashcard) => {
          set({ error: null });

          const { data: newFlashcard, error } =
            createFlashcardSchema.safeParse(flashcard);

          if (error) {
            set({ error: error.errors.at(0)?.message ?? null });
            throw error;
          }

          set((state) => ({
            error: null,
            allFlashcards: [
              ...state.allFlashcards,
              { ...newFlashcard, id: crypto.randomUUID() },
            ],
          }));
        },
        updateFlashcard: async (flashcard) => {
          set({ error: null });

          const { data: updatedFlashcard, error } =
            updateFlashcardSchema.safeParse(flashcard);

          if (error) {
            set({ error: error.errors.at(0)?.message });
            throw error;
          }

          const existingFlashcard = get().allFlashcards.find(
            (f) => f.id === updatedFlashcard.id
          );
          if (!existingFlashcard) {
            // TODO: handle error
            return;
          }

          set((state) => ({
            error: null,
            allFlashcards: state.allFlashcards.map((f) =>
              f.id === updatedFlashcard.id ? { ...f, ...updatedFlashcard } : f
            ),
          }));
        },
        deleteFlashcard: async (flashcard) => {
          set({ error: null });

          const { data: deletedFlashcard, error } =
            deleteFlashcardSchema.safeParse(flashcard);

          if (error) {
            set({ error: error.errors.at(0)?.message });
            throw error;
          }

          set((state) => ({
            error: null,
            allFlashcards: state.allFlashcards.filter(
              (f) => f.id !== deletedFlashcard.id
            ),
          }));
        },
        setTextFilter: (text) => {
          set({ textFilter: text });
        },
        dismissError: () => {
          set({ error: null });
        },
      }),
      {
        name: "flashcards",
        merge: (persistedState, currentState) => {
          const _persistedState =
            typeof persistedState === "object" && persistedState !== null
              ? persistedState
              : {};

          return {
            ...currentState,
            ..._persistedState,
            loading: false,
          };
        },
      }
    )
  )
);

export function useFlashcards() {
  const store = useFlashcardsStore();
  const flashcards = useMemo(
    () =>
      store.allFlashcards.filter((f) =>
        f.front
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(store.textFilter.toLowerCase().replace(/\s+/g, ""))
      ),
    [store.allFlashcards, store.textFilter]
  );

  return {
    ...store,
    flashcards,
    flashcardsCount: store.allFlashcards.length,
  };
}
