import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// import SearchBar from "../shared/SearchBar";
import ChatList from "./ChatList";
import { supabase } from "../../App";
import { Friend, RecentChatRow } from "../../Types";

const linkStyle = {
  display: "block",
  color: "white",
  padding: "10px 20px",
  textDecoration: "none",
};

function MessageSidebar({ onSelectFriend }: { onSelectFriend: (id: string) => void }): React.ReactElement {

  const [friends, setFriends] = useState<Friend[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: { user } } = await supabase.auth.getUser();
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

        console.log("Mapped friend IDs:", mapped.map(f => f.id));
        setFriends(mapped);
      }

  };

  fetchUsers();
}, []);


  return (
    <div
      style={{
        width: "300px",
        height: "100vh",
        backgroundColor: "#111",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #333",
      }}
    >
      <ChatList onSelect={onSelectFriend} friends={friends} currentUserId={currentUserId!}/>
    </div>
  );
}

export default MessageSidebar;