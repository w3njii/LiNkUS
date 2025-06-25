import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../App";
import "../styles/EditUserProfile.css";
import SelectCourses from "../components/user/SelectCourses";

function EditUserProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedCourseCodes, setSelectedCourseCodes] = useState<string[]>([]);

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
        alert("Failed to load profile");
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
        .select("course_code")
        .eq("user_id", user.id);

      if (!error && data) {
        setSelectedCourseCodes(data.map((d) => d.course_code));
      }
    };

    loadUserCourses();
  }, []);
  

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarUrl(preview);
      setNewAvatarFile(file);
    }
  };

  const uploadAvatar = async (file: File, userId: string) => {
    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    const filePath = `${userId}_${timestamp}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-pics")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      alert("Upload Error");
      return null;
    }

    const { data } = supabase.storage
      .from("profile-pics")
      .getPublicUrl(filePath);

    return data?.publicUrl ? `${data.publicUrl}?v=${timestamp}` : null;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    if (!name || !username) {
      setFormError(
        !name && !username
          ? "Please Enter a Name and Username"
          : !name
          ? "Please Enter a Name"
          : "Please Enter a Username"
      );
      return;
    }

    if (!isValidUsername(username)) {
      setFormError(
        "Username can only contain letters, numbers, and underscores (no spaces or symbols)"
      );
      return;
    }


    await supabase.from("user_courses").delete().eq("user_id", user.id);

    if (selectedCourseCodes.length > 0) {
      const newCourseRows = selectedCourseCodes.map((code) => ({
        user_id: user.id,
        course_code: code,
      }));

      const { error: courseError } = await supabase
        .from("user_courses")
        .insert(newCourseRows);

      if (courseError) {
        console.error("Failed to update courses:", courseError.message);
        setFormError("Profile saved, but failed to update courses");
        return;
      }
    }

    setUploading(true);

    let uploadedAvatarUrl = avatarUrl;

    if (newAvatarFile) {
      const publicUrl = await uploadAvatar(newAvatarFile, user.id);
      if (publicUrl) {
        uploadedAvatarUrl = publicUrl;
      }
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ name, username, bio, avatar_url: uploadedAvatarUrl })
      .eq("user_id", user.id)
      .select();

    if (error) {
      console.log(error);
      setFormError("Username already exists, please choose different username");
    } else {
      setFormError("");
      navigate("/profile", { replace: true });
    }

    setUploading(false);
  };


  const handleCancel = () => {
    navigate("/profile", { replace: true });
  };

  const isValidUsername = (username: string) => {
    return /^[a-zA-Z0-9_]+$/.test(username);
  };

  return (
    <form className="edit-profile-page">
      <h2>Edit Your Profile</h2>

      <div className="edit-profile-form">
        <div className="edit-profile-picture-section">
          <img
            src={avatarUrl || "/images/default_user_image.png"}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/images/default_user_image.png";
            }}
            alt="Profile"
            className="edit-profile-picture"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={uploading}
          />
        </div>

        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor="bio">
          Bio:
          <textarea
            rows={4}
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>

        <div className="select-courses-container-user-profile">
          Courses:
          <SelectCourses
            selectedCourseCodes={selectedCourseCodes}
            setSelectedCourseCodes={setSelectedCourseCodes}
          />
        </div>

        <div className="edit-profile-buttons">
          <button
            type="button"
            className="save-button"
            onClick={handleSave}
            disabled={uploading}
          >
            {uploading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
            disabled={uploading}
          >
            Cancel
          </button>
        </div>
      </div>
      {formError && <p className="form-save-error">{formError}</p>}
    </form>
  );
}

export default EditUserProfile;
