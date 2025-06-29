import { FiMessageCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function MessagesButton({ className }: { className?: string }) {
  const navigate = useNavigate();

  return (
    <button className={className} onClick={() => {
      console.log("clicked!");
      navigate("/message");
    }}>
      <FiMessageCircle size={25} />
      Messages
    </button>
  );
}

export default MessagesButton;