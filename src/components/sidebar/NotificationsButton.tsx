import { FaRegBell } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function NotificationsButton({ className }: { className?: string }) {
  const navigate = useNavigate();

  return (
    <button className={className} onClick={() => navigate("/Notifications")}>
      <FaRegBell size={24} />
      Notifications
    </button>
  );
}

export default NotificationsButton;
