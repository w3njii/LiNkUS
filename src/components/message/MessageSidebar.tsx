import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import { supabase } from "../../App";
import { Friend, RecentChatRow } from "../../Types";
import "../../styles/components/message/MessageSidebar.css";

function MessageSidebar({
  onSelectFriend,
}: {
  onSelectFriend: (id: string) => void;
}): React.ReactElement {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>();

  const fetchUsers = async (uid?: string) => {
    const userId = uid ?? currentUserId;
    if (!userId) return;

    const { data, error } = await supabase.rpc("get_recent_chats", {
      uid: userId,
    });

    if (data) {
      const mapped = (data as RecentChatRow[]).map((row) => ({
        id: row.friend_id,
        username: row.friend_username,
        avatar_url: row.friend_avatar_url,
        lastMessage: row.last_message,
      }));
      setFriends(mapped);
    }
  };

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id);
      fetchUsers(user?.id);
    };
    init();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    const channel = supabase
      .channel("sidebar-message-listener")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const { user_id, recipient_id } = payload.new;
          if (user_id === currentUserId || recipient_id === currentUserId) {
            fetchUsers();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId]);

  return (
    <div className="messages-sidebar-main-container">
      <ChatList
        onSelect={onSelectFriend}
        friends={friends}
        currentUserId={currentUserId!}
      />
    </div>
  );
}

export default MessageSidebar;
