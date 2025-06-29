import { useState, useEffect } from "react";
import SideBar from "../components/sidebar/SideBar";
import { supabase } from "../App";
import { UserProfileSearch } from "../Types";
import "../styles/Search.css";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserProfileSearch[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const searchUsers = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      setLoading(true);

      const { data: users, error } = await supabase
        .from("profiles")
        .select("user_id, name, username, avatar_url")
        .or(`name.ilike.%${query}%,username.ilike.%${query}%`);

      if (error) {
        console.error("Failed to search users:", error.message);
        setResults([]);
        return;
      } else if (!users || users.length === 0) {
        setResults([]);
      } else {
        setResults(users);
      }

      setLoading(false);
    };

    searchUsers();
  }, [query]);

  return (
    <div className="search-content">
      <div className="sidebar-container">
        <SideBar />
      </div>

      <div className="search-main">
        <input
          type="text"
          placeholder="Search for users..."
          value={query}
          onChange={handleSearchChange}
          className="search-input"
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="search-results">
            {results.map((user) => (
              <button
                className="user-card"
                key={user.user_id}
                onClick={() => navigate(`/user/${user.user_id}`)}
              >
                <div className="user-card-image-container">
                  <img
                    src={user.avatar_url || "/images/default_user_image.png"}
                    alt={`${user.username}'s avatar`}
                    className="user-avatar-in-search"
                  />
                </div>
                <div className="user-card-name-username-container">
                  <h1>{user.name}</h1>
                  <div>@{user.username}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



export default Search;
