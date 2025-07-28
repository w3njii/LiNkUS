import "../styles/Main.css";
import SideBar from "../components/sidebar/SideBar";
import React, { useState, useEffect } from "react";
import { Event } from "../Types";
import LoadMoreButton from "../components/events/LoadMoreButton";
import Discover from "../components/discover/Discover";
import { supabase } from "../App";

function Main() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const pageSize = 10;
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

  const fetchEvents = async (pageIndex: number) => {
    setIsLoading(true);
    const from = pageIndex * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .gte("start_time", new Date().toISOString())
      .order("start_time", { ascending: true })
      .range(from, to);

    if (error) {
      console.error("Fetch error:", error);
      setHasMore(false);
    } else {
      setEvents((prev) => [...prev, ...(data || [])]);
      if ((data || []).length < pageSize) setHasMore(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents(0);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchEvents(nextPage);
  };

  return (
    <div className="main-content">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="center-container">
        <h2 style={{ color: "black" }}>Upcoming Events</h2>
        <div className="center-scroll-area">
          {events.length === 0 && !isLoading ? (
            <p style={{ color: "white" }}>No upcoming events found.</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="event-placeholder"
                onClick={() => window.open(event.event_url, "_blank")}
              >
                <div className="event-details">
                  <strong>{event.title}</strong>
                  <div>
                    {new Date(event.start_time).toLocaleString("en-SG")}
                  </div>
                  <div>{event.location ?? "Location TBC"}</div>
                </div>
                <div className="event-image">
                  {event.image_url && (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      style={{
                        maxHeight: "60%",
                        maxWidth: "100%",
                        marginTop: "8px",
                      }}
                    />
                  )}
                </div>
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
