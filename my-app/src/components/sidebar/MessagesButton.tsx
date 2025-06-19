import { FiMessageCircle } from "react-icons/fi";

function MessagesButton({ className }: { className?: string }) {
  return (
    <button className={className}>
      <FiMessageCircle size={25} />
      Messages
    </button>
  );
}

export default MessagesButton;
