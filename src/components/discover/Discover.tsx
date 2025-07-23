import React, { useEffect, useState } from "react";
import { getMatchesForUser, Match } from "../lib/matchingAlgorithm";
import MatchCard from "./MatchCard";
import "../../styles/components/discover/Discover.css";

export default function Discover({ currentUserId }: { currentUserId: string }) {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      console.log("Fetching matches for:", currentUserId);
      const result = await getMatchesForUser(currentUserId);
      console.log("Matching result:", result);
      setMatches(result);
    };

    fetchMatches();
  }, [currentUserId]);

  return (
    <div className="discover-container-in-discover">
      <h1 className="discover-heading">Discover Matches</h1>
      <div className="discover-grid">
        {matches.map((match) => (
          <MatchCard key={match.user_id} match={match} />
        ))}
      </div>
    </div>
  );
}