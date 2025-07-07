import {
  useFlashcards as useZustandFlashcards,
  useFlashcardsStore as useZustandFlashcardsStore,
} from "@/hooks/flashcards/useFlashcards";
import { FlashcardsStore } from "@/model/flashcard";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlashcardsPage } from "../flashcards-page";

const mockUseZustandFlashcardsStore =
  useZustandFlashcardsStore as typeof useZustandFlashcardsStore & {
    getState: () => FlashcardsStore;
    setState: (state: Partial<FlashcardsStore>) => void;
  };

describe("FlashcardsPage", () => {
  describe.each([
    [
      "With zustand store",
      () => <FlashcardsPage store={useZustandFlashcards()} />,
      function hydrateZustandStore(state?: Partial<FlashcardsStore>) {
        act(() => {
          mockUseZustandFlashcardsStore.setState({
            allFlashcards: [],
            loading: false,
            flashcardsCount: 0,
            textFilter: "",
            ...state,
          });
        });
      },
    ],
    // TODO: Add tests for this page under different store implementations
  ])("%s", (_, TestComponent, hydrateStore) => {
    it("should render without crashing", () => {
      render(<TestComponent />);
    });

    it("should render an activity indicator while hydrating the store", () => {
      const { getByRole } = render(<TestComponent />);

      expect(getByRole("progressbar")).toBeInTheDocument();
    });

    it("should render empty state", () => {
      const { getByText, getByAltText } = render(<TestComponent />);

      hydrateStore();

      expect(getByText("flashcards.emptyState.title")).toBeInTheDocument();
      expect(
        getByText("flashcards.emptyState.description")
      ).toBeInTheDocument();
      expect(getByAltText("flashcards.emptyState.title")).toBeInTheDocument();
    });

    it("should add a new flashcard", async () => {
      const user = userEvent.setup();

      const { getByTitle, getByPlaceholderText, rerender } = render(
        <TestComponent />
      );

      hydrateStore();

      await user.click(getByTitle("newFlashcard.addNewCard"));

      rerender(<TestComponent />);

      await user.type(
        getByPlaceholderText("newFlashcard.placeholder"),
        "Test flashcard"
      );

      await user.keyboard("[Enter]");

      expect(
        mockUseZustandFlashcardsStore.getState().allFlashcards
      ).toHaveLength(1);
      expect(
        mockUseZustandFlashcardsStore.getState().allFlashcards
      ).toContainEqual({
        id: expect.any(String),
        frontColor: expect.any(String),
        front: "Test flashcard",
      });
    });

    it("should render flashcards", () => {
      const { getByText } = render(<TestComponent />);

      hydrateStore({
        allFlashcards: [
          {
            id: "1",
            front: "Test flashcard 1",
            frontColor: "#000000",
          },
          {
            id: "2",
            front: "Test flashcard 2",
            frontColor: "#111111",
          },
          {
            id: "3",
            front: "Test flashcard 3",
            frontColor: "#222222",
          },
        ],
      });

      expect(getByText("Test flashcard 1")).toBeInTheDocument();
      expect(getByText("Test flashcard 2")).toBeInTheDocument();
      expect(getByText("Test flashcard 3")).toBeInTheDocument();
    });

    it("should filter flashcards", async () => {
      const user = userEvent.setup();

      const { getByText, getByPlaceholderText, queryByText } = render(
        <TestComponent />
      );

      hydrateStore({
        allFlashcards: [
          {
            id: "1",
            front: "Test flashcard 1",
            frontColor: "#000000",
          },
          {
            id: "2",
            front: "Test flashcard 2",
            frontColor: "#111111",
          },
          {
            id: "3",
            front: "Test flashcard 3",
            frontColor: "#222222",
          },
        ],
      });

      await user.type(
        getByPlaceholderText("flashcards-page.search.placeholder"),
        "Test flashcard 1"
      );

      expect(getByText("Test flashcard 1")).toBeInTheDocument();
      expect(queryByText("Test flashcard 2")).not.toBeInTheDocument();
      expect(queryByText("Test flashcard 3")).not.toBeInTheDocument();
    });

    it("should clear filters", async () => {
      const user = userEvent.setup();

      const { getByText, getByPlaceholderText, queryByDisplayValue } = render(
        <TestComponent />
      );

      hydrateStore({
        allFlashcards: [
          {
            id: "1",
            front: "Test flashcard 1",
            frontColor: "#000000",
          },
        ],
      });

      await user.type(
        getByPlaceholderText("flashcards-page.search.placeholder"),
        "No results query"
      );

      expect(queryByDisplayValue("No results query")).toBeInTheDocument();
      expect(getByText("flashcards.noMatches.title")).toBeInTheDocument();
      expect(getByText("flashcards.noMatches.description")).toBeInTheDocument();

      await user.click(getByText("flashcards-page.clearFilters"));

      expect(queryByDisplayValue("No results query")).not.toBeInTheDocument();
      expect(getByText("Test flashcard 1")).toBeInTheDocument();
    });
  });
});
