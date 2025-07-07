import { z } from "zod";

export const flashcardDetailsSchema = z.object({
    id: z.string().uuid(),
    front: z.string().min(1),
    frontColor: z.string().regex(/^#([0-9a-fA-F]{6})$/),
});

export type FlashcardDetails = z.infer<typeof flashcardDetailsSchema>;

export const createFlashcardSchema = flashcardDetailsSchema.omit({ id: true })

export type CreateFlashcard = z.infer<typeof createFlashcardSchema>;

export const updateFlashcardSchema = flashcardDetailsSchema.pick({ id: true }).and(flashcardDetailsSchema.omit({ id: true }).partial());

export type UpdateFlashcard = z.infer<typeof updateFlashcardSchema>;

export const deleteFlashcardSchema = flashcardDetailsSchema.pick({ id: true });

export type DeleteFlashcard = z.infer<typeof deleteFlashcardSchema>;

export type FlashcardsStore = {
    allFlashcards: FlashcardDetails[];
    flashcardsCount: number;
    flashcards: FlashcardDetails[];
    loading: boolean;
    error: string | null;
    dismissError: () => void;

    addFlashcard: (flashcard: CreateFlashcard) => Promise<void>;
    updateFlashcard: (flashcard: UpdateFlashcard) => Promise<void>;
    deleteFlashcard: (flashcard: DeleteFlashcard) => Promise<void>;

    setTextFilter: (text: string) => void;
    textFilter: string;
};
