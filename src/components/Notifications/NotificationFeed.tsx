import { useEffect, useState } from "react";
import { supabase } from "../../App";

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
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((n) => (
          <div key={n.id}>
            <p>{getMessage(n)}</p>
            <small>{new Date(n.created_at).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}
