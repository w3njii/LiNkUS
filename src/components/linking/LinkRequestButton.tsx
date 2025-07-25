import { useEffect, useState } from "react";
import {
  sendLinkRequest,
  removeLink,
  areUsersLinked,
  getOutgoingRequests,
  getIncomingRequests,
} from "./linking";

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
    <button
      onClick={handleClick}
      disabled={status === "pending"}
      className={`${
        status === "linked"
          ? "bg-red-500"
          : status === "pending"
          ? "bg-gray-400"
          : "bg-blue-500"
      } text-white px-4 py-2 rounded`}
    >
      {status === "linked"
        ? "Remove Link"
        : status === "pending"
        ? "Pending"
        : "Link Up"}
    </button>
  );
}

export default LinkRequestButton;
