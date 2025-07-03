import {
  CreateFlashcard,
  createFlashcardSchema,
  DeleteFlashcard,
  deleteFlashcardSchema,
  FlashcardDetails,
  flashcardDetailsSchema,
  UpdateFlashcard,
  updateFlashcardSchema,
} from "@/model/flashcard";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type FlashcardsStore = {
  flashcards: FlashcardDetails[];
  add: (flashcard: CreateFlashcard) => void;
  update: (flashcard: UpdateFlashcard) => void;
  delete: (flashcard: DeleteFlashcard) => void;
};

export const useFlashcards = create<FlashcardsStore>()(
  devtools(
    persist(
      (set, get) => ({
        flashcards: [],
        add: (flashcard) => {
          const newFlashcard = createFlashcardSchema.parse(flashcard);

          set((state) => ({
            flashcards: [
              ...state.flashcards,
              { ...newFlashcard, id: crypto.randomUUID() },
            ],
          }));
        },
        update: (flashcard) => {
          const updatedFlashcard = updateFlashcardSchema.parse(flashcard);
          const existingFlashcard = get().flashcards.find(
            (f) => f.id === updatedFlashcard.id
          );
          if (!existingFlashcard) {
            throw new Error("Flashcard not found");
          }

          set((state) => ({
            flashcards: state.flashcards.map((f) =>
              f.id === updatedFlashcard.id ? { ...f, ...updatedFlashcard } : f
            ),
          }));
        },
        delete: (flashcard) => {
          const deletedFlashcard = deleteFlashcardSchema.parse(flashcard);
          
          set((state) => ({
            flashcards: state.flashcards.filter(
              (f) => f.id !== deletedFlashcard.id
            ),
          }));
        },
      }),
      { name: "flashcards" }
    )
  )
);
