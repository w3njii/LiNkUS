import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AcceptedLinks from "../components/linking/AcceptedLinks";
import * as linking from "../components/linking/linking";

const mockAcceptedLinks = [
  { requester_id: "user1", recipient_id: "user2", status: "accepted" },
  { requester_id: "user3", recipient_id: "user1", status: "accepted" },
];

jest.mock("../components/linking/linking", () => ({
  getAcceptedLinks: jest.fn(),
}));

describe("AcceptedLinks component", () => {
  beforeEach(() => {
    (linking.getAcceptedLinks as jest.Mock).mockResolvedValue({
      data: mockAcceptedLinks,
    });
  });

  test("renders nothing if no links found", async () => {
    (linking.getAcceptedLinks as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(<AcceptedLinks currentUserId="user1" />);
    await waitFor(() => {
      expect(screen.getByText("My Connections")).toBeInTheDocument();
    });

    expect(screen.queryByText("user2")).not.toBeInTheDocument();
    expect(screen.queryByText("user3")).not.toBeInTheDocument();
  });
});