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
  onStatusChange,
}: {
  currentUserId: string;
  otherUserId: string;
  onStatusChange?: () => void;
}) {
  const [status, setStatus] = useState<
    "none" | "linked" | "pending" | "cancel"
  >("none");
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
      const { data: incoming } = await getIncomingRequests(currentUserId);
      const isPending = incoming?.some(
        (req) => req.requester_id === otherUserId
      );
      const isCancellable = outgoing?.some(
        (req) => req.recipient_id === otherUserId && req.status === "pending"
      );

      if (isCancellable) {
        setStatus("cancel");
      } else if (isPending) {
        setStatus("pending");
      } else {
        setStatus("none");
      }

      setLoading(false);
    };

    checkStatus();
  }, [currentUserId, otherUserId]);

  const handleClick = async () => {
    if (status === "linked" || status === "cancel") {
      await removeLink(currentUserId, otherUserId);
      setStatus("none");
    } else if (status === "none") {
      const { error } = await sendLinkRequest(currentUserId, otherUserId);
      if (error) {
        alert("Error sending request");
      } else {
        setStatus("cancel");
      }
    }

    if (onStatusChange) onStatusChange();
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
            : status === "cancel"
            ? "link-request-cancel"
            : "link-request-none"
        }`}
      >
        {status === "linked"
          ? "Remove Link"
          : status === "pending"
          ? "Pending"
          : status === "cancel"
          ? "Cancel Request"
          : "Link"}
      </button>
    </div>
  );
}

export default LinkRequestButton;

