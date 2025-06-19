import { IoNotifications } from "react-icons/io5";

function NotificationsButton({ className }: { className?: string }) {
  return (
    <button className={className}>
      <IoNotifications size={25} />
      Notifications
    </button>
  );
}

export default NotificationsButton;
