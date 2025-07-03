import { CreateFlashcard } from "@/model/flashcard";
import { EditableText } from "@/components/common/editable-text";
import { FlashcardBase } from "./flashcard-base";
import { useState } from "react";

interface NewFlashcardProps {
  onAdd: (flashcard: CreateFlashcard) => void;
}

const colorOptions = [
  "#FFD1DC",
  "#B5EAD7",
  "#C7CEEA",
  "#FFDAC1",
  "#E2F0CB",
  "#B5D8FA",
  "#FFFACD",
  "#F1CBFF",
  "#FFB7B2",
  "#D4A5A5",
];

export function NewFlashcard({ onAdd }: NewFlashcardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [front, setFront] = useState("");

  return (
    <FlashcardBase
      front={
        isEditing ? (
        <EditableText
          text={front}
          isEditing={isEditing}
          onEditStart={() => setIsEditing(true)}
          onEdit={(text) => setFront(text)}
          onEditEnd={(text) => {
            if (!text) return;

            const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            onAdd({ front: text, frontColor: randomColor });
            setIsEditing(false);
            setFront("");
          }}
          onEditCancel={() => setIsEditing(false)}
        />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center h-full justify-center w-full h-32 bg-accent/30 hover:bg-accent/50 transition-all rounded-md border-2 border-dashed border-accent text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="Add new flashcard"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )
      }
    />
  );
}
