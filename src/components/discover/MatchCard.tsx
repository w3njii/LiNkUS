import React from "react";
import "../../styles/components/discover/MatchCard.css"; // import the CSS file

export type Match = {
  user_id: string;
  name: string;
  username: string;
  sharedCourses: string[];
  sharedInterests: string[];
};

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="match-card">
      <div className="match-header">
        <h2 className="match-username">@{match.username}</h2>
        <p className="match-name">{match.name}</p>
      </div>

      {match.sharedCourses.length > 0 && (
        <div className="match-section">
          <p className="match-label courses">📚 Shared Courses:</p>
          <ul className="match-list">
            {match.sharedCourses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </div>
      )}

      {match.sharedInterests.length > 0 && (
        <div className="match-section">
          <p className="match-label interests">🎯 Shared Interests:</p>
          <ul className="match-list">
            {match.sharedInterests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
