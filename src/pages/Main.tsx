import "../styles/Main.css";
import SideBar from "../components/sidebar/SideBar";
import React, { useState, useEffect } from "react";
import { Event } from "../Types";
import LoadMoreButton from "../components/events/LoadMoreButton";
import Discover from "../components/discover/Discover";
import { supabase } from "../App";

function Main() {
  const [events, setEvents] = useState<Event[]>([]);
  const [fileIndex, setFileIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  const fetchEvents = async (index: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/data/events${index}.json`);
      if (!res.ok) throw new Error("File not found");
      const json = await res.json();
      setEvents((prev) => [...prev, ...json.data]);
    } catch (err) {
      console.warn(`events${index}.json not found`);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(fileIndex);
  }, []);

  const loadMore = () => {
    const nextIndex = fileIndex + 1;
    setFileIndex(nextIndex);
    fetchEvents(nextIndex);
  };

  return (
    <div className="main-content">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="center-container">
        <h2 style={{ color: "black" }}>Upcoming Events (Now is not synced)</h2>
        <div className="center-scroll-area">
          {events.length === 0 ? (
            <p style={{ color: "white" }}>Loading events...</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="event-placeholder">
                <strong>{event.name}</strong>
                <div>{event.start_date}</div>
                <div>{event.mode ?? "Mode TBC"}</div>
                {event.image_link && (
                  <img
                    src={event.image_link}
                    alt={event.name}
                    style={{
                      maxHeight: "60%",
                      maxWidth: "100%",
                      marginTop: "8px",
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>
        {hasMore && (
          <LoadMoreButton
            onClick={loadMore}
            isLoading={isLoading}
            hasMore={hasMore}
          />
        )}
      </div>
      <div className="discover-container">
        {currentUserId ? (
          <Discover currentUserId={currentUserId} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Main;
