import { render, screen, fireEvent } from "@testing-library/react";
import SearchButton from "../components/sidebar/SearchButton";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SearchButton", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the button correctly", () => {
    render(<SearchButton />);
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("navigate to /Search on click", () => {
    render(<SearchButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/Search");
  });

  test("applies the provided className", () => {
    render(<SearchButton className="test-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("test-class");
  });
});