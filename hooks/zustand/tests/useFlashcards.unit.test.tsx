import { act, renderHook } from "@testing-library/react";
import { useFlashcards } from "../useFlashcards";

describe("useFlashcards", () => {
  it("should be empty by default", () => {
    const screen = renderHook(useFlashcards);

    expect(screen.result.current.flashcards).toHaveLength(0);
  });

  it("should add flashcards", () => {
    const screen = renderHook(useFlashcards);

    act(() => {
      screen.result.current.addFlashcard({
        front: "Test flashcard 1",
        frontColor: "#000000",
      });

      screen.result.current.addFlashcard({
        front: "Test flashcard 2",
        frontColor: "#111111",
      });
    });

    expect(screen.result.current.flashcards).toHaveLength(2);
  });

  it("should filter flashcards by text", () => {
    const screen = renderHook(useFlashcards);

    act(() => {
      screen.result.current.addFlashcard({
        front: "Test flashcard 1",
        frontColor: "#000000",
      });

      screen.result.current.addFlashcard({
        front: "Test flashcard 2",
        frontColor: "#111111",
      });

      screen.result.current.addFlashcard({
        front: "Ignore card",
        frontColor: "#333333",
      });

      screen.result.current.setTextFilter("Test flashcard 1");
    });

    expect(screen.result.current.flashcards).toHaveLength(1);
  });

  it("should filter flashcards by text", () => {
    const screen = renderHook(useFlashcards);

    act(() => {
      screen.result.current.addFlashcard({
        front: "Test flashcard 1",
        frontColor: "#000000",
      });

      screen.result.current.addFlashcard({
        front: "Test flashcard 2",
        frontColor: "#111111",
      });

      screen.result.current.addFlashcard({
        front: "Ignore card",
        frontColor: "#333333",
      });

      screen.result.current.setTextFilter("Test flashcard 1");
    });

    act(() => {
      screen.result.current.setTextFilter("Test flashcard");
    });

    expect(screen.result.current.flashcards).toHaveLength(2);
  });

  it("should ignore whitespace in text filter", () => {
    const screen = renderHook(useFlashcards);

    act(() => {
      screen.result.current.addFlashcard({
        front: "Test        flashcard",
        frontColor: "#000000",
      });

      screen.result.current.addFlashcard({
        front: "Test flashcard",
        frontColor: "#111111",
      });

      screen.result.current.addFlashcard({
        front: "Ignore card",
        frontColor: "#333333",
      });
    });

    act(() => {
      screen.result.current.setTextFilter("Testflashcard");
    });

    expect(screen.result.current.flashcards).toHaveLength(2);
  });

  it("should ignore case in text filter", () => {
    const screen = renderHook(useFlashcards);

    act(() => {
      screen.result.current.addFlashcard({
        front: "TEST FLASHCARD 1",
        frontColor: "#000000",
      });

      screen.result.current.addFlashcard({
        front: "test flashcard 2",
        frontColor: "#111111",
      });

      screen.result.current.addFlashcard({
        front: "Ignore card",
        frontColor: "#333333",
      });
    });

    act(() => {
      screen.result.current.setTextFilter("tEsT FlAsHcArD");
    });

    expect(screen.result.current.flashcards).toHaveLength(2);
  });

  it("should update flashcards", () => {
    const screen = renderHook(useFlashcards);

    act(() => {
      screen.result.current.addFlashcard({
        front: "Test flashcard 1",
        frontColor: "#000000",
      });
      screen.result.current.addFlashcard({
        front: "Test flashcard 2",
        frontColor: "#111111",
      });
    });

    act(() => {
      screen.result.current.updateFlashcard({
        id: screen.result.current.flashcards[0].id,
        front: "Test flashcard 1 updated",
        frontColor: "#222222",
      });
    });

    expect(screen.result.current.flashcards).toEqual([
      {
        id: expect.any(String),
        front: "Test flashcard 1 updated",
        frontColor: "#222222",
      },
      {
        id: expect.any(String),
        front: "Test flashcard 2",
        frontColor: "#111111",
      },
    ]);
  });

  it("should delete flashcards", () => {
    const screen = renderHook(useFlashcards);

    act(() => {
      screen.result.current.addFlashcard({
        front: "Test flashcard 1",
        frontColor: "#000000",
      });

      screen.result.current.addFlashcard({
        front: "Test flashcard 2",
        frontColor: "#111111",
      });
    });

    act(() => {
      screen.result.current.deleteFlashcard({
        id: screen.result.current.flashcards[0].id,
      });
    });

    expect(screen.result.current.flashcards).toHaveLength(1);
    expect(screen.result.current.flashcards[0].front).toBe("Test flashcard 2");
  });
});
