import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LogoutButton from "../components/sidebar/LogoutButton";
import { supabase } from "../App";

jest.mock("../App", () => ({
  supabase: {
    auth: {
      signOut: jest.fn(),
    },
  },
}));

describe("LogoutButton", () => {
  test("renders logout button", () => {
    render(<LogoutButton />);
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  test("calls supabase.auth.signOut when clicked", async () => {
    const mockSignOut = supabase.auth.signOut as jest.Mock;
    mockSignOut.mockResolvedValue({ error: null });

    render(<LogoutButton />);
    const button = screen.getByText("Log out");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  test("logs error if signOut fails", async () => {
    const mockConsole = jest.spyOn(console, "error").mockImplementation(() => {});
    const mockSignOut = supabase.auth.signOut as jest.Mock;
    mockSignOut.mockResolvedValue({
      error: { message: "Sign out failed" },
    });

    render(<LogoutButton />);
    fireEvent.click(screen.getByText("Log out"));

    await waitFor(() => {
      expect(mockConsole).toHaveBeenCalledWith(
        "Error logging out:",
        "Sign out failed"
      );
    });

    mockConsole.mockRestore();
  });

  test("see log out message if signOut succeeds", async () => {
    const mockConsole = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockSignOut = supabase.auth.signOut as jest.Mock;
    mockSignOut.mockResolvedValue({ error: null });

    render(<LogoutButton />);
    fireEvent.click(screen.getByText("Log out"));

    await waitFor(() => {
      expect(mockConsole).toHaveBeenCalledWith("Logged out successfully");
    });

    mockConsole.mockRestore();
  });
});