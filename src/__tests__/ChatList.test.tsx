import { render, screen, fireEvent} from "@testing-library/react";
import ChatList from "../components/message/ChatList";
import { Friend } from "../Types";

const mockFriends: Friend[] = [
  {
    id: "friend1",
    username: "linkus",
    lastMessage: "Orbital is fun!",
  },
  {
    id: "friend2",
    username: "orbital",
    lastMessage: null,
  },
];

describe("ChatList", () => {
  test("renders initial friends", () => {
    const onSelect = jest.fn();
    render(
      <ChatList
        onSelect={onSelect}
        friends={mockFriends}
        currentUserId="self"
      />
    );

    expect(screen.getByText("linkus")).toBeInTheDocument();
    expect(screen.getByText("orbital")).toBeInTheDocument();
    expect(screen.getByText("Orbital is fun!")).toBeInTheDocument();
    expect(screen.getByText("(New conversation)")).toBeInTheDocument();
  });

  test("calls onSelect when clicking on a friend", () => {
    const onSelect = jest.fn();
    render(
      <ChatList
        onSelect={onSelect}
        friends={mockFriends}
        currentUserId="self"
      />
    );

    fireEvent.click(screen.getByText("linkus"));
    expect(onSelect).toHaveBeenCalledWith("friend1");
  });
});