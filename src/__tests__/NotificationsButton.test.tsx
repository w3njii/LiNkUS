import { render, screen, fireEvent } from "@testing-library/react";
import NotificationsButton from "../components/sidebar/NotificationsButton";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("NotificationsButton", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the button correctly", () => {
    render(<NotificationsButton />);
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("navigate to /Notifications on click", () => {
    render(<NotificationsButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/Notifications");
  });

  test("applies the provided className", () => {
    render(<NotificationsButton className="test-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("test-class");
  });
});