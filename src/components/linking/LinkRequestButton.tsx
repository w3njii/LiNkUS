import { useEffect, useState } from "react";
import {
  sendLinkRequest,
  removeLink,
  areUsersLinked,
  getOutgoingRequests,
  getIncomingRequests,
} from "./linking";
import "../../styles/components/linking/LinkRequestButton.css"

function LinkRequestButton({
  currentUserId,
  otherUserId,
}: {
  currentUserId: string;
  otherUserId: string;
}) {
  const [status, setStatus] = useState<"none" | "linked" | "pending">("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      setLoading(true);

      const linked = await areUsersLinked(currentUserId, otherUserId);
      if (linked) {
        setStatus("linked");
        setLoading(false);
        return;
      }

      const { data: outgoing } = await getOutgoingRequests(currentUserId);
      const {data: incoming } = await getIncomingRequests(currentUserId);
      const isPending = outgoing?.some((req) => req.recipient_id === otherUserId && req.status === "pending") || incoming?.some((req) => req.requester_id === otherUserId)

      if (isPending) {
        setStatus("pending");
      } else {
        setStatus("none");
      }

      setLoading(false);
    };

    checkStatus();
  }, [currentUserId, otherUserId]);

  const handleClick = async () => {
    if (status === "linked") {
      await removeLink(currentUserId, otherUserId);
      setStatus("none");
    } else if (status === "none") {
      const { error } = await sendLinkRequest(currentUserId, otherUserId);
      if (error) {
        alert("Error sending request");
      } else {
        setStatus("pending");
      }
    }
  };

  if (loading) return <button disabled>Loading...</button>;

  return (
    <div className="link-request-button-container">
      <button
        onClick={handleClick}
        disabled={status === "pending"}
        className={`link-request-button ${
          status === "linked"
            ? "link-request-linked"
            : status === "pending"
            ? "link-request-pending"
            : "link-request-none"
        }`}
      >
        {status === "linked"
          ? "Remove Link"
          : status === "pending"
          ? "Pending"
          : "Link Up"}
      </button>
    </div>
  );
}

export default LinkRequestButton;
