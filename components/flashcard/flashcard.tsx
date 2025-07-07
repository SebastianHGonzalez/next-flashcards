"use client";

import {
  DeleteFlashcard,
  FlashcardDetails,
  UpdateFlashcard,
} from "@/model/flashcard";
import { useState } from "react";
import { EditableText } from "@/components/common/editable-text";
import { FlashcardBase } from "./flashcard-base";

interface FlashcardProps {
  flashcard: FlashcardDetails;
  onUpdate: (details: UpdateFlashcard) => Promise<void>;
  onDelete: (details: DeleteFlashcard) => Promise<void>;
}

export function Flashcard({ flashcard, onUpdate, onDelete }: FlashcardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [front, setFront] = useState(flashcard.front);

  return (
    <FlashcardBase
      frontColor={flashcard.frontColor}
      front={
        <EditableText
          text={front}
          isEditing={isEditing}
          onEditStart={() => setIsEditing(true)}
          onEdit={(text) => setFront(text)}
          onEditEnd={(text) => {
            onUpdate({ ...flashcard, front: text })
              .then(() => {
                setIsEditing(false);  
                setFront(text);
              })
              .catch(() => {
                setFront(flashcard.front);
                setIsEditing(false);
              });
          }}
          onEditCancel={() => {
            setIsEditing(false);
            setFront(flashcard.front);
          }}
        />
      }
      onDelete={() => onDelete({ id: flashcard.id })}
    />
  );
}
