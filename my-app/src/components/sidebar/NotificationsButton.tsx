import { FaRegBell } from "react-icons/fa6";

function NotificationsButton({ className }: { className?: string }) {
  return (
    <button className={className}>
      <FaRegBell size={24} />
      (WIP)
    </button>
  );
}

export default NotificationsButton;
