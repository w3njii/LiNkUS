import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function SearchButton({ className }: { className?: string }) {
  const navigate = useNavigate();
  
  return (
    <button className={className} onClick={() => navigate("/Search")}>
      <IoSearch size={25} />
      Search
    </button>
  );
}

export default SearchButton;
