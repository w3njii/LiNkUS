import { useEffect, useState } from "react";
import { supabase } from "../../App";
import "../../styles/components/notifications/NotificationFeed.css"

type Notification = {
  id: string;
  type: "incoming_request" | "accepted" | "rejected";
  from_user_id: string;
  created_at: string;
  from_user: {
    username: string;
  } | null;
};
  

export default function NotificationsFeed({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*, from_user:from_user_id (username)")
        .eq("user_id", currentUserId)
        .order("created_at", { ascending: false });

      if (data) setNotifications(data);
    };

    fetchNotifications();
  }, [currentUserId]);

  const getMessage = (n: Notification) => {
    const username = n.from_user?.username || "Someone";

    switch (n.type) {
      case "incoming_request":
        return `You received a link request from ${username}`;
      case "accepted":
        return `${username} accepted your request`;
      case "rejected":
        return `${username} rejected your request`;
      default:
        return "Unknown notification type";
    }
  };

  return (
    <div className="notification-feed">
      <h2 className="notification-title">Notifications</h2>
      <div className="notifications-notifications">
        {notifications.length === 0 ? (
          <p className="notification-empty">No notifications yet</p>
        ) : (
          notifications.map((n) => (
            <div className="notification-card" key={n.id}>
              <p className="notification-message">{getMessage(n)}</p>
              <small className="notification-time">
                {new Date(n.created_at).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
