import { useEffect, useState } from "react";
import { getIncomingRequests, acceptRequest, rejectRequest } from "./linking";
import { useNavigate } from "react-router-dom";
import "../../styles/components/linking/IncomingRequests.css"

function IncomingRequests({ currentUserId }: { currentUserId: string }) {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data } = await getIncomingRequests(currentUserId);
      if (data) setRequests(data);
    };
    fetchRequests();
  }, []);

  const handleAccept = async (requesterId: string) => {
    await acceptRequest(requesterId, currentUserId);
    setRequests((req) => req.filter((r) => r.requester_id !== requesterId));
  };

  const handleReject = async (requesterId: string) => {
    await rejectRequest(requesterId, currentUserId);
    setRequests((req) => req.filter((r) => r.requester_id !== requesterId));
  };

  if (requests.length > 0) {
    return (
      <div className="incoming-requests">
        <h2 className="incoming-title">Incoming Link Requests</h2>
        {requests.map((req) => (
          <button
            className="request-card"
            key={req.requester_id}
            onClick={() => navigate(`/user/${req.requester_id}`)}
          >
            <p className="request-user">
              @{req.profiles?.username || "Unknown"}
            </p>
            <div className="request-actions">
              <button
                className="accept-btn"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAccept(req.requester_id);
                }}
              >
                Accept
              </button>
              <button
                className="reject-btn"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleReject(req.requester_id);
                }}
              >
                Reject
              </button>
            </div>
          </button>
        ))}
      </div>
    );
  } else {
    return (
      <div>
      </div>
    );
  }
}

export default IncomingRequests;
