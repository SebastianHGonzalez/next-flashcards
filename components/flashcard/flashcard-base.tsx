import { ReactNode } from "react";
import { Button } from "../common/button";
import { TrashIcon } from "lucide-react";
import { Card } from "../common/card";

interface FlashcardBaseProps {
  front: ReactNode;
  frontColor?: string;
  onDelete?: () => void;
}

export function FlashcardBase({
  front,
  frontColor,
  onDelete,
}: FlashcardBaseProps) {
  return (
    <Card className="h-full p-4 overflow-hidden relative" style={{ backgroundColor: frontColor }}>
      {front}

      {onDelete && (
        <Button variant="ghost" size="icon" onClick={onDelete} className="absolute bottom-2 right-2">
          <TrashIcon className="w-4 h-4" />
        </Button>
      )}
    </Card>
  );
}
