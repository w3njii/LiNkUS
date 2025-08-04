import { render, screen, fireEvent } from "@testing-library/react";
import MessagesButton from "../components/sidebar/MessagesButton";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("MessagesButton", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the button correctly", () => {
    render(<MessagesButton />);
    expect(screen.getByText("Messages")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("navigate to /message on click", () => {
    render(<MessagesButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/message");
  });

  test("applies the provided className", () => {
    render(<MessagesButton className="test-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("test-class");
  });
});