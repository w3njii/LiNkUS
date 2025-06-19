import { TiHome } from "react-icons/ti";

function HomeButton({ className }: { className?: string }) {
  return (
    <button className={className}>
      <TiHome size={25} />
      Home
    </button>
  );
}

export default HomeButton;
