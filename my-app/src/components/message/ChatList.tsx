import React from "react";
import { useState, useEffect } from "react";
import Search from "./MessageSearch";
import { Friend, ChatListProps } from "../../Types";
import { supabase } from "../../App";

function ChatList({ onSelect, friends, currentUserId }: ChatListProps): React.ReactElement {
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
                          const maybeFriend = friends.find(f => f.id === u.user_id);
                          return {
                            id: u.user_id,
                            username: u.username, 
                            avatar_url: u.avatar_url,
                            lastMessage: maybeFriend?.lastMessage ?? null,
                          };
                        });

      // Merge current friends + new users
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Search value={search} onChange={handleSearch} />

      <div style={{ overflowY: "auto", flexGrow: 1 }}>
        {mergedList.map((friend) => (
          <div
            key={friend.id}
            onClick={() => {
              console.log("Selected friend ID:", friend.id);
              onSelect(friend.id);
            }}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #333",
              color: "white",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{friend.username}</div>
            <div style={{ fontSize: "0.875rem", color: "#ccc" }}>
              {friend.lastMessage ?? <span style={{ color: "#888" }}>(New conversation)</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;