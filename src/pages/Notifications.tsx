import { useState, useEffect } from "react";
import SideBar from "../components/sidebar/SideBar";
import { supabase } from "../App";
import IncomingRequests from "../components/linking/IncomingRequests";
import NotificationsFeed from "../components/Notifications/NotificationFeed";
import "../styles/Notifications.css"

function Notifications() {

  const [currentUserId, setCurrentUserId] = useState<string>();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="notifications-content">
      <div className="sidebar-container">
        <SideBar />
      </div>

      <div className="notifications-main">
        {currentUserId && (
          <>
            <IncomingRequests currentUserId={currentUserId} />
            <br />
            <NotificationsFeed currentUserId={currentUserId} />
          </>
        )}
      </div>
    </div>
  );
}

export default Notifications;
