import { render, screen, fireEvent } from "@testing-library/react";
import HomeButton from "../components/sidebar/HomeButton";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  Object.defineProperty(window, "location", {
    value: {
      reload: jest.fn(),
    },
    writable: true,
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("HomeButton", () => {
  test("renders the button correctly", () => {
    render(
      <BrowserRouter>
        <HomeButton />
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  test("calls window.location.reload when onClick", () => {
    render(
      <BrowserRouter>
        <HomeButton />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /home/i }));
    expect(window.location.reload).toHaveBeenCalled();
  });

  test("applies className if provided", () => {
    render(
      <BrowserRouter>
        <HomeButton className="random" />
      </BrowserRouter>
    );

    expect(screen.getByRole("button")).toHaveClass("random");
  });
});