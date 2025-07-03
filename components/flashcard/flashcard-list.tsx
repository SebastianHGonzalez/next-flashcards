

export function FlashListContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">{children}</div>
  );
}

export function FlashList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex flex-wrap gap-4">
      {children}
    </ul>
  );
}

export function FlashcardListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex-grow-1 flex-shrink-0 basis-[300px] max-w-[600px] w-full min-h-[100px] min-w-[300px]">
      {children}
    </li>
  );
}
