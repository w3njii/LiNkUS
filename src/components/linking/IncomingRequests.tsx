import { useEffect, useState } from "react";
import {
  getIncomingRequests,
  acceptRequest,
  rejectRequest,
} from "./linking";

function IncomingRequests({ currentUserId }: { currentUserId: string }) {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data } = await getIncomingRequests(currentUserId);
      if (data) setRequests(data);
    };
    fetchRequests();
  }, []);

  console.log(requests);

  const handleAccept = async (requesterId: string) => {
    await acceptRequest(requesterId, currentUserId);
    setRequests((req) => req.filter((r) => r.requester_id !== requesterId));
  };

  const handleReject = async (requesterId: string) => {
    await rejectRequest(requesterId, currentUserId);
    setRequests((req) => req.filter((r) => r.requester_id !== requesterId));
  };

  return (
    <div>
      <h2>Incoming Requests</h2>
      {requests.map((req) => (
        <div key={req.requester_id}>
          <span>{req.requester_id}</span>
          <button onClick={() => handleAccept(req.requester_id)}>Accept</button>
          <button onClick={() => handleReject(req.requester_id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default IncomingRequests;
