import { render } from "@testing-library/react";
import { useFlashcards } from "@/hooks/zustand/useFlashcards";
import { FlashcardsPage } from "../flashcards-page";

describe("FlashcardsPage", () => {
  describe("With zustand store", () => {
    function TestComponent() {
      const store = useFlashcards();
      return <FlashcardsPage store={store} />;
    }

    it("should render", () => {
      render(<TestComponent />);
    });

    // TODO: Add tests for the flashcards page
  });
});
