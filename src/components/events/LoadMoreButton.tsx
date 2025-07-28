import React from "react";

function LoadMoreButton(props: {
  onClick: () => void;
  isLoading: boolean;
  hasMore: boolean;
}) {
  if (!props.hasMore) return null;

  return (
    <button
      onClick={props.onClick}
      disabled={props.isLoading}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        background: "#3366cc",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {props.isLoading ? "Loading..." : "Load More"}
    </button>
  );
}

export default LoadMoreButton;