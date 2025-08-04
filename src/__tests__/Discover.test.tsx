import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Discover from "../components/discover/Discover";
import * as matchingModule from "../components/lib/matchingAlgorithm";
import { Match } from "../components/lib/matchingAlgorithm";
import { MemoryRouter } from "react-router-dom";

const mockMatches: Match[] = [
  {
    user_id: "user1",
    name: "LINKUS",
    username: "linkus123",
    avatar_url: "https://example.com/linkus.jpg",
    sharedCourses: ["CS1010", "CS1231S", "CS2030S", "CS2040S"],
    sharedInterests: ["AI", "Web Development", "Cybersecurity", "Databases"],
    score: 4 + 4,
  },
  {
    user_id: "user2",
    name: "Orbital",
    username: "orbital321",
    avatar_url: "",
    sharedCourses: ["CS2100"],
    sharedInterests: [],
    score: 1 + 0,
  },
];

describe("Discover component", () => {
  beforeEach(() => {
    jest
      .spyOn(matchingModule, "getMatchesForUser")
      .mockResolvedValue(mockMatches);
  });

  test("renders heading", () => {
    render(
      <MemoryRouter>
        <Discover currentUserId="test-user" />
      </MemoryRouter>
    );
    expect(screen.getByText("Discover")).toBeInTheDocument();
  });

  test("displays details from matches", async () => {
    render(
      <MemoryRouter>
        <Discover currentUserId="test-user" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(matchingModule.getMatchesForUser).toHaveBeenCalled();
    });

    expect(screen.getByAltText("linkus123's avatar")).toBeInTheDocument();
    expect(screen.getByAltText("orbital321's avatar")).toBeInTheDocument();

    expect(screen.getByText("LINKUS")).toBeInTheDocument();
    expect(screen.getByText("@linkus123")).toBeInTheDocument();

    expect(screen.getByText("Orbital")).toBeInTheDocument();
    expect(screen.getByText("@orbital321")).toBeInTheDocument();

    expect(screen.getAllByText("Also takes")).toHaveLength(2);
    expect(
      screen.getByText("CS1010, CS1231S, CS2030S... and 1 more")
    ).toBeInTheDocument();

    expect(screen.getByText("Also interested in")).toBeInTheDocument();
    expect(
      screen.getByText("AI, Web Development, Cybersecurity... and 1 more")
    ).toBeInTheDocument();
  });
});