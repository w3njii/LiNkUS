import React, { useState, useEffect } from "react";
import Search from "./MessageSearch";
import { Friend, ChatListProps } from "../../Types";
import { supabase } from "../../App";
import "../../styles/components/message/ChatList.css";

function ChatList({
  onSelect,
  friends,
  currentUserId,
}: ChatListProps): React.ReactElement {
  const [search, setSearch] = useState("");
  const [mergedList, setMergedList] = useState<Friend[]>([]);

  const handleSearch = async (term: string) => {
    setSearch(term);

    if (term.trim().length === 0) {
      setMergedList(friends);
      return;
    }

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("user_id, username, avatar_url")
      .ilike("username", `%${term}%`)
      .neq("user_id", currentUserId);

    if (profiles) {
      const existingIds = new Set(friends.map((f) => f.id));
      const newUsers = profiles
        .filter((u) => !existingIds.has(u.user_id))
        .map((u) => {
          const maybeFriend = friends.find((f) => f.id === u.user_id);
          return {
            id: u.user_id,
            username: u.username,
            avatar_url: u.avatar_url,
            lastMessage: maybeFriend?.lastMessage ?? null,
          };
        });

      const matchingFriends = friends.filter((f) =>
        (f.username ?? "").toLowerCase().includes(term.toLowerCase())
      );

      setMergedList([...matchingFriends, ...newUsers]);
    }
  };

  useEffect(() => {
    setMergedList(friends);
  }, [friends]);

  return (
    <div className="chat-list-container">
      <Search value={search} onChange={handleSearch} />
      <div className="chat-items-container">
        {mergedList.map((friend) => (
          <div
            key={friend.id}
            className="chat-item"
            onClick={() => onSelect(friend.id)}
          >
            <div className="chat-username">{friend.username}</div>
            <div className="chat-message">
              {friend.lastMessage ?? (
                <span className="new-convo">(New conversation)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default ChatList;
