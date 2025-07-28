import React, { useState, useEffect } from "react";
import Search from "./MessageSearch";
import { Friend, ChatListProps } from "../../Types";
import { supabase } from "../../App";
import "../../styles/components/message/ChatList.css";
import { areUsersLinked } from "../linking/linking";

const filterLinkedUsers = async (users: Friend[], currentUserId: string) => {
  const checks = await Promise.all(
    users.map(async (user) => {
      const linked = await areUsersLinked(currentUserId, user.id);
      return linked ? user : null;
    })
  );
  return checks.filter((u): u is Friend => u !== null);
};

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
      const linkedFriends = await filterLinkedUsers(friends, currentUserId);
      setMergedList(linkedFriends);
      return;
    }

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("user_id, username, name, avatar_url")
      .ilike("username", `${term}%`)
      .neq("user_id", currentUserId);

    if (profiles) {
      const allCandidates: Friend[] = profiles.map((u) => {
        const maybeFriend = friends.find((f) => f.id === u.user_id);
        return {
          id: u.user_id,
          username: u.username,
          avatar_url: u.avatar_url,
          lastMessage: maybeFriend?.lastMessage ?? null,
        };
      });

      const linkedUsers = await filterLinkedUsers(allCandidates, currentUserId);
      setMergedList(linkedUsers);
    }
  };

  useEffect(() => {
    const filterOnLoad = async () => {
      const linkedFriends = await filterLinkedUsers(friends, currentUserId);
      setMergedList(linkedFriends);
    };
    if (currentUserId) {
      filterOnLoad();
    }
  }, [friends, currentUserId]);

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
