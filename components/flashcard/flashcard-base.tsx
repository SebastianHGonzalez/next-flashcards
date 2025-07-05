import { ReactNode } from "react";
import { Button } from "../common/button";
import { TrashIcon } from "lucide-react";
import { Card } from "../common/card";
import { cn } from "@/lib/utils";
interface FlashcardBaseProps {
  front: ReactNode;
  frontColor?: string;
  onDelete?: () => void;
  className?: string;
}

export function FlashcardBase({
  front,
  frontColor,
  onDelete,
  className,
}: FlashcardBaseProps) {
  return (
    <Card
      className={cn("h-full p-4 overflow-hidden relative", className)}
      style={{ backgroundColor: frontColor }}
    >
      {front}

      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="absolute bottom-2 right-2"
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      )}
    </Card>
  );
}
