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
      .or(`username.ilike.${term}%,name.ilike.${term}%`)
      .neq("user_id", currentUserId);

    if (profiles) {
      const allCandidates: Friend[] = profiles.map((u) => {
        const maybeFriend = friends.find((f) => f.id === u.user_id);
        return {
          id: u.user_id,
          username: u.username,
          avatar_url: u.avatar_url,
          name: u.name,
          lastMessage: maybeFriend?.lastMessage ?? null,
        };
      });

      const linkedUsers = await filterLinkedUsers(allCandidates, currentUserId);
      setMergedList(linkedUsers);
    }
  };

  useEffect(() => {
    const fetchLinkedUsers = async () => {
      if (!currentUserId) return;

      const { data: allProfiles, error } = await supabase
        .from("profiles")
        .select("user_id, username, name, avatar_url")
        .neq("user_id", currentUserId);

      if (error) {
        console.error("Error fetching profiles:", error.message);
        return;
      }

      const allCandidates: Friend[] = allProfiles.map((u) => {
        const maybeFriend = friends.find((f) => f.id === u.user_id);
        return {
          id: u.user_id,
          username: u.username,
          name: u.name,
          avatar_url: u.avatar_url,
          lastMessage: maybeFriend?.lastMessage ?? null,
        };
      });

      const linked = await filterLinkedUsers(allCandidates, currentUserId);
      const withRecentChats = linked.filter((user) => user.lastMessage != null);
      setMergedList(withRecentChats);
    };

    fetchLinkedUsers();
  }, [currentUserId, friends]);

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
            <img
              src={friend.avatar_url || "/images/default_user_image.png"}
              alt={`${friend.username}'s avatar`}
              className="user-profile-picture-in-chatlist"
            />
            <div className="chatlist-user-card-chat-information">
              <div className="chat-name">{friend.name}</div>
              <div className="chat-username">@{friend.username}</div>

              <div className="chat-message">
                {friend.lastMessage ?? (
                  <span className="new-convo">(New conversation)</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
