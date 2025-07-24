import { useEffect, useState } from "react";
import { getAcceptedLinks } from "./linking";

function AcceptedLinks({ currentUserId }: { currentUserId: string }) {
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await getAcceptedLinks(currentUserId);
      if (data) setLinks(data);
    };
    fetchLinks();
  }, []);

  return (
    <div>
      <h2>My Connections</h2>
      {links.map((link) => {
        const otherUser =
          link.requester_id === currentUserId
            ? link.recipient_id
            : link.requester_id;
        return <div key={otherUser}>{otherUser}</div>;
      })}
    </div>
  );
}

export default AcceptedLinks;
