import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../App";
import MessageSidebar from "../components/message/MessageSidebar";
import MessageInput from "../components/message/MessageInput";
import SideBar from "../components/sidebar/SideBar";
import "../styles/Message.css";
import { useParams } from "react-router-dom";
import { SelectContainer } from "react-select/dist/declarations/src/components/containers";

interface MainProps {
  user: Session["user"];
}

function Message({ user }: MainProps) {
  const [selectedFriend, setSelectedFriend] = useState<string>("");
  const [friendName, setFriendName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchFriendName = async () => {
      if (!selectedFriend) {
        setFriendName("");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("name, avatar_url")
        .eq("user_id", selectedFriend)
        .single();

      if (error) {
        console.error("Error fetching friend name:", error);
        setFriendName("");
      } else if (data) {
        setFriendName(data.name);
        setAvatarUrl(data.avatar_url);
      }
    };

    fetchFriendName();
  }, [selectedFriend]);

  useEffect(() => {
    if (userId) {
      setSelectedFriend(userId);
    }
  }, [userId]);

  return (
    <div className="message-main">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="messages-content-container">
        <div className="message-main-container">
          <div className="message-main-content-sidebar-container">
            <MessageSidebar onSelectFriend={setSelectedFriend} />
          </div>
          <div className="message-main-content-input-container">
            {selectedFriend ? (
              <>
                <div className="messaging-selected-friend-top-part">
                  <img
                    src={avatarUrl || "/images/default_user_image.png"}
                    alt={`${selectedFriend}'s avatar`}
                    className="user-profile-picture-in-messaging"
                  />
                  <h2 className="messaging-selected-friend-name">
                    {friendName}
                  </h2>
                </div>
                <MessageInput recipientId={selectedFriend} />
              </>
            ) : (
              <MessageInput recipientId={selectedFriend} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
