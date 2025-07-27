import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/discover/MatchCard.css";

export type Match = {
  user_id: string;
  name: string;
  username: string;
  avatar_url: string;
  sharedCourses: string[];
  sharedInterests: string[];
};

function formatSharedList(list: string[], limit = 3): string {
  if (list.length === 1) return list[0];
  if (list.length <= limit) return list.join(", ");

  const shown = list.slice(0, limit).join(", ");
  const remaining = list.length - limit;
  return `${shown}... and ${remaining} more`;
}

export default function MatchCard({ match }: { match: Match }) {
  const navigate = useNavigate();

  return (
    <button
      className="match-username-button"
      onClick={() => navigate(`/user/${match.user_id}`)}
    >
      <div className="match-card">
        <div className="user-card-user-info-section">
          <div className="user-card-image-container-discover">
            <img
              src={match.avatar_url || "/images/default_user_image.png"}
              alt={`${match.username}'s avatar`}
              className="user-avatar-in-discover"
            />
          </div>
          <div className="match-header">
            <p className="match-name">{match.name}</p>
            <p className="match-username">@{match.username}</p>
          </div>
        </div>

        <div className="match-common-information">
          {match.sharedCourses.length > 0 && (
            <div className="match-section">
              <p className="match-label courses">Also takes</p>
              <p className="match-things">
                {formatSharedList(match.sharedCourses)}
              </p>
            </div>
          )}

          {match.sharedInterests.length > 0 && (
            <div className="match-section">
              <p className="match-label interests">Also interested in</p>
              <p className="match-things">
                {formatSharedList(match.sharedInterests)}
              </p>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
