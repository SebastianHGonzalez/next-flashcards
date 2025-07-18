"use client";

import { CreateFlashcard } from "@/model/flashcard";
import { EditableText } from "@/components/common/editable-text";
import { FlashcardBase } from "./flashcard-base";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface NewFlashcardProps {
  className?: string;
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

export function NewFlashcard({ onAdd, className }: NewFlashcardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [front, setFront] = useState("");
  const t = useTranslations("newFlashcard");

  return (
    <FlashcardBase
      className={className}
      front={
        isEditing ? (
          <EditableText
            placeholder={t("placeholder")}
            text={front}
            isEditing={isEditing}
            onEditStart={() => setIsEditing(true)}
            onEdit={(text) => setFront(text)}
            onEditEnd={(text) => {
              setIsEditing(false);
              setFront("");
              if (!text) return;

              const randomColor =
                colorOptions[Math.floor(Math.random() * colorOptions.length)];
              onAdd({ front: text, frontColor: randomColor });
            }}
            onEditCancel={() => setIsEditing(false)}
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center h-full justify-center w-full h-32 bg-accent/30 hover:bg-accent/50 transition-all rounded-md border-2 border-dashed border-accent text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label={t("addNewCard")}
            title={t("addNewCard")}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        )
      }
    />
  );
}
