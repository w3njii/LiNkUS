import { useNavigate } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import { useEffect, useState } from "react";
import { supabase } from "../App";
import "../styles/UserProfile.css";

type UserCourseRow = {
  course_code: string;
  courses: {
    name: string;
  };
};

function UserProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [selectedCourses, setSelectedCourses] = useState<{ code: string; name: string }[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Failed to load profile:", error.message);
      } else if (data) {
        setName(data.name);
        setUsername(data.username);
        setBio(data.bio);
        if (data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const loadUserCourses = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("user_courses")
        .select("course_code, courses(name)")
        .eq("user_id", user.id);

      if (error) {
        console.log("Failed to Load Courses: " + error.message);
      } else if (data) {
        const formatted = (data as unknown as UserCourseRow[]).map((c) => ({
          code: c.course_code,
          name: c.courses.name,
        }));
        setSelectedCourses(formatted);
      }
    };

    loadUserCourses();
  }, []);
  

  return (
    <div className="profile-content">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="user-profile-container">
        <div className="user-profile-edit-profile-container">
          <button
            className="user-profile-edit-profile-button"
            onClick={() => navigate("/profile/edituserprofile")}
          >
            Edit Profile
          </button>
        </div>

        <div className="user-profile-top-content">
          <div className="profile-picture-container-user-profile">
            <img
              src={avatarUrl || "/images/default_user_image.png"}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/default_user_image.png";
              }}
              alt={`${username}'s profile picture`}
              className="user-profile-picture"
            />
          </div>
          <div className="user-profile-info-container">
            <div className="user-profile-name-container">{name}</div>
            <div className="user-profile-username-container">@{username}</div>
            <div className="user-profile-links-number">
              <span style={{ fontWeight: "750" }}>0 </span>
              <span style={{ fontWeight: "500" }}> links </span>
            </div>
            <div className="user-profile-bio">{bio}</div>
          </div>
        </div>

        <div className="user-profile-bottom-content">
          <div className="user-profile-courses-info">
            <h1>Courses</h1>
            <div className="courses-list-user-profile">
              {selectedCourses.map((course) => (
                <div key={course.code}>
                  - {course.code}: {course.name}
                </div>
              ))}
            </div>
          </div>

          <div className="user-profile-interests-info">
            <h1>Interests</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
