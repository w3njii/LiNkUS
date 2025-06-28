import { TiHome } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

function HomeButton({ className }: { className?: string }) {
  const navigate = useNavigate();
  
  return (
    <button className={className} onClick={() => window.location.reload()}>
      <TiHome size={25} />
      Home
    </button>
  );
}

export default HomeButton;
