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
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id);

      const { data, error } = await supabase.rpc("get_recent_chats", {
        uid: user?.id,
      });

      console.log("RPC result:", data);

      if (data) {
        const mapped = (data as RecentChatRow[]).map((row) => ({
          id: row.friend_id,
          username: row.friend_username,
          avatar_url: row.friend_avatar_url,
          lastMessage: row.last_message,
        }));

        console.log(
          "Mapped friend IDs:",
          mapped.map((f) => f.id)
        );
        setFriends(mapped);
      }
    };

    fetchUsers();
  }, []);

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
