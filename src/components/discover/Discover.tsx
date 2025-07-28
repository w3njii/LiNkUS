import React, { useEffect, useState } from "react";
import { getMatchesForUser, Match } from "../lib/matchingAlgorithm";
import MatchCard from "./MatchCard";
import "../../styles/components/discover/Discover.css";

export default function Discover({ currentUserId }: { currentUserId: string }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      console.log("Fetching matches for:", currentUserId);
      const result = await getMatchesForUser(currentUserId);
      console.log("Matching result:", result);
      setMatches(result);
      setLoading(false);
    };

    fetchMatches();
  }, [currentUserId]);

  return (
    <div className="discover-container-in-discover">
      <div className="disover-heading-container">
        <h1 className="discover-heading">Discover</h1>
      </div>
      <div className="discover-grid-container">
        {matches.length > 0 && !loading ? (
          <div className="discover-grid">
            {matches.map((match) => (
              <MatchCard key={match.user_id} match={match} />
            ))}
          </div>
        ) : loading ? (
          <p>Searching for matches...</p>
        ) : (
          <div>
            <p>(No matches found)</p>
          </div>
        )}
      </div>
    </div>
  );
}
