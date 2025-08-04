import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { useAutoLogoutTimer } from "../hooks/useAutoLogoutTimer"; // adjust path if needed
import { supabase } from "../App";

jest.useFakeTimers();
jest.spyOn(window, "alert").mockImplementation(() => {});

const mockSignOut = jest.fn().mockResolvedValue({ error: null });
supabase.auth.signOut = mockSignOut;

function TestComponent({ session }: { session: any }) {
  useAutoLogoutTimer(session);
  return <div>Test</div>;
}

describe("useAutoLogoutTimer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does not set timer if no session", () => {
    render(<TestComponent session={null} />);
    expect(mockSignOut).not.toHaveBeenCalled();
  });

  test("logs out after inactivity", async () => {
    render(<TestComponent session={{ user: { id: "123" } }} />);

    await act(async () => {
      jest.advanceTimersByTime(1000 * 60 * 5);
    });

    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith("You have been logged out due to inactivity.");
  });

  test("resets timer on activity", async () => {
    render(<TestComponent session={{ user: { id: "123" } }} />);

    act(() => {
      fireEvent.mouseMove(window);
    });

    await act(async () => {
      jest.advanceTimersByTime(1000 * 60 * 4);
    });

    expect(mockSignOut).not.toHaveBeenCalled();

    act(() => {
      fireEvent.keyDown(window);
    });

    await act(async () => {
      jest.advanceTimersByTime(1000 * 60 * 4);
    });

    expect(mockSignOut).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(1000 * 60 * 1);
    });

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});