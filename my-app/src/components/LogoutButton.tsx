import { supabase } from "../App";
import "../styles/LogoutButton.css";

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
  } else {
    console.log("Logged out successfully");
  }
};

function LogoutButton() {
  return (
    <button className="logout" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
