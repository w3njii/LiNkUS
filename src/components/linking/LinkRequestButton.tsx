import { sendLinkRequest } from "./linking"

function LinkRequestButton({
  currentUserId,
  otherUserId,
}: {
  currentUserId: string;
  otherUserId: string;
}) {
  const handleClick = async () => {
    const { error } = await sendLinkRequest(currentUserId, otherUserId);
    if (error) alert("Error sending request");
    else alert("Request sent!");
  };

  return <button onClick={handleClick}>Link Up</button>;
}

export default LinkRequestButton;
