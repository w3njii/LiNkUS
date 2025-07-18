import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../App";
import SideBar from "../sidebar/SideBar";
import { IUserProfileDisplay } from "../../Types";
import { useNavigate } from "react-router-dom";
import "../../styles/UserProfile.css";

function UserProfileDisplay() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<IUserProfileDisplay>();
  const [courses, setCourses] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("name, username, bio, avatar_url")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Failed to fetch profile:", error.message);
      } else {
        setProfile(data);
      }

      const { data: coursesData, error: coursesError } = await supabase
        .from("user_courses")
        .select("course_code")
        .eq("user_id", userId);

      if (coursesError) {
        console.error("Failed to fetch courses:", coursesError.message);
      } else if (coursesData) {
        setCourses(coursesData.map((c) => c.course_code));
      }

      const { data: interestsData, error: interestsError } = await supabase
        .from("user_interests")
        .select("interests")
        .eq("user_id", userId);

      if (interestsError) {
        console.error("Failed to fetch interests:", interestsError.message);
      } else if (interestsData) {
        setInterests(interestsData.map((i) => i.interests));
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) return(<div></div>)
  return (
    <div className="profile-content">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="user-profile-container">
        <div className="user-profile-display-back-button-container">
          <button
            className="user-profile-display-back-button"
            onClick={() => navigate("/search")}
          >
            Back
          </button>
        </div>
        <div className="user-profile-top-content">
          <div className="profile-picture-container-user-profile">
            <img
              src={profile.avatar_url || "/images/default_user_image.png"}
              alt={`${profile.username}'s avatar`}
              className="user-profile-picture"
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "/images/default_user_image.png")
              }
            />
          </div>
          <div className="user-profile-info-container">
            <div className="user-profile-name-container">{profile.name}</div>
            <div className="user-profile-username-container">
              @{profile.username}
            </div>
            <div className="user-profile-links-number">
              <span style={{ fontWeight: "750" }}>0 </span>
              <span style={{ fontWeight: "500" }}> links </span>
            </div>
            <div className="user-profile-bio">{profile.bio}</div>
          </div>
        </div>

        <div className="user-profile-bottom-content">
          <div className="user-profile-courses-info">
            <h1>Courses</h1>
            <div className="courses-list-user-profile">
              {courses.length > 0 ? (
                courses.map((course) => <div key={course}>- {course}</div>)
              ) : (
                <div>No courses listed</div>
              )}
            </div>
          </div>

          <div className="user-profile-interests-info">
            <h1>Interests</h1>
            <div className="courses-list-user-profile">
              {interests.length > 0 ? (
                interests.map((interest) => (
                  <div key={interest}>- {interest}</div>
                ))
              ) : (
                <div>No interests listed</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileDisplay;
