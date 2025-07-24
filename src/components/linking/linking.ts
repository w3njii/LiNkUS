import { supabase } from "../../App";

// Send a request
export async function sendLinkRequest(requesterId: string, recipientId: string) {
  const { data, error } = await supabase.from("user_link_requests").upsert({
    requester_id: requesterId,
    recipient_id: recipientId,
    status: "pending",
  });

  await supabase.from("notifications").insert({
    user_id: recipientId,
    type: "incoming_request",
    from_user_id: requesterId,
  });
  return { data, error };
}

// Get incoming requests
export async function getIncomingRequests(userId: string) {
  return supabase
    .from("user_link_requests")
    .select("requester_id, created_at")
    .eq("recipient_id", userId)
    .eq("status", "pending");
}

// Get outgoing requests
export async function getOutgoingRequests(userId: string) {
  return supabase
    .from("user_link_requests")
    .select("recipient_id, status")
    .eq("requester_id", userId);
}

// Accept a request
export async function acceptRequest(requesterId: string, recipientId: string) {
  await supabase.from("notifications").insert({
    user_id: requesterId,
    type: "accepted",
    from_user_id: recipientId,
  });
  return supabase
    .from("user_link_requests")
    .update({ status: "accepted", updated_at: new Date().toISOString() })
    .eq("requester_id", requesterId)
    .eq("recipient_id", recipientId);
}

// Reject a request
export async function rejectRequest(requesterId: string, recipientId: string) {
  await supabase.from("notifications").insert({
    user_id: requesterId,
    type: "rejected",
    from_user_id: recipientId,
  });
  return supabase
    .from("user_link_requests")
    .update({ status: "rejected", updated_at: new Date().toISOString() })
    .eq("requester_id", requesterId)
    .eq("recipient_id", recipientId);
}

// Get accepted connections
export async function getAcceptedLinks(userId: string) {
  return supabase
    .from("user_link_requests")
    .select("*")
    .or(
      `and(requester_id.eq.${userId},status.eq.accepted),and(recipient_id.eq.${userId},status.eq.accepted)`
    );
}
