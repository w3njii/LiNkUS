import { IoSearch } from "react-icons/io5";

function SearchButton({ className }: { className?: string }) {
  return (
    <button className={className}>
      <IoSearch size={25} />
      Search
    </button>
  );
}

export default SearchButton;
