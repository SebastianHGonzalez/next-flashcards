import { cn } from "@/lib/utils";

interface EditableTextProps {
  text: string;
  isEditing: boolean;
  onEditStart: () => void;
  onEdit: (text: string) => void;
  onEditEnd: (text: string) => void;
  onEditCancel: () => void;
}

export function EditableText({
  text,
  isEditing,
  onEditStart,
  onEdit,
  onEditEnd,
  onEditCancel,
}: EditableTextProps) {
  const className = "text-2xl block w-full dark:hover:bg-accent/50 m-0 text-left font-semibold w-full whitespace-normal break-words overflow-hidden text-wrap text-gray-800 mb-2 bg-transparent border-none focus:ring-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 p-0 cursor-text rounded-md";

  if (isEditing) {
    return (
      <textarea
        autoFocus
        value={text}
        className={cn(className, "bg-accent/50 resize-none")}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          onEdit(e.target.value);
        }}
        onBlur={() => onEditEnd(text.trim())}
        rows={1}
        ref={el => {
          if (el) {
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
            el.setSelectionRange(el.value.length, el.value.length);
          }
        }}
        onInput={e => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = target.scrollHeight + "px";
        }}
        onKeyDown={e => {
          if (e.key === "Escape" && !e.shiftKey) {
            onEditCancel();
          }
          if (e.key === "Enter" && !e.shiftKey) {
            onEditEnd(text.trim());
          }
        }}
      />
    );
  }

  return (
    <button onClick={onEditStart} className={cn(className, "hover:bg-accent transition-all hover:text-accent-foreground whitespace-pre-wrap")}>
      {text}
    </button>
  );
}

