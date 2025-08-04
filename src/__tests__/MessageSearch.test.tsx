import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MessageSearch from "../components/message/MessageSearch";

describe("MessageSearch", () => {
  test("renders the input correctly", () => {
    render(<MessageSearch value="hello" onChange={() => {}} />);
    const input = screen.getByPlaceholderText("Search chats...") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("hello");
  });

  test("calls onChange with updated value when input changes", () => {
    const mockOnChange = jest.fn();
    render(<MessageSearch value="" onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText("Search chats...");
    fireEvent.change(input, { target: { value: "new text" } });
    expect(mockOnChange).toHaveBeenCalledWith("new text");
  });
});