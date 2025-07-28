import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../App";
import { Message } from "../../Types";
import "../../styles/components/message/MessageInput.css";
import { useRef } from "react";

function MessageInput({
  recipientId,
}: {
  recipientId: string;
}): React.JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const navigate = useNavigate();

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

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUserId || !recipientId) {
        console.warn("Skipping fetch: missing user ID or recipient ID");
        return;
      }
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(user_id.eq.${currentUserId},recipient_id.eq.${recipientId}),and(user_id.eq.${recipientId},recipient_id.eq.${currentUserId})`
        )
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMessages(data as Message[]);
      } else {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentUserId, recipientId]);

  const sendMessage = async () => {
    if (!input.trim() || !recipientId) {
      console.error("Missing message content or recipient ID.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("Please log in.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    const userMsg: Message = {
      id: `${Date.now()}`,
      user_id: user.id,
      recipient_id: recipientId,
      content: input.trim(),
      username: user.user_metadata?.username || "anonymous",
      avatar_url: user.user_metadata?.avatar_url || "",
      created_at: new Date().toISOString(),
    };

    setMessages((prev: Message[]) => [...prev, userMsg]);

    const { error } = await supabase.from("messages").insert({
      user_id: user.id,
      recipient_id: recipientId,
      content: userMsg.content,
      username: userMsg.username,
      avatar_url: userMsg.avatar_url,
    });

    if (error) console.error("Something went wrong!!!", error);

    setInput("");
  };

  useEffect(() => {
    if (!recipientId || !currentUserId) return;

    const channel = supabase
      .channel("incoming-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `recipient_id=eq.${currentUserId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;

          if (
            (newMessage.user_id === recipientId &&
              newMessage.recipient_id === currentUserId) ||
            (newMessage.user_id === currentUserId &&
              newMessage.recipient_id === recipientId)
          ) {
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [recipientId, currentUserId]);

  if (!recipientId) {
    return (
      <div className="message-input-container">
        <div className="message-log">
          <p
            style={{
              color: "rgb(0, 0, 0)",
              textAlign: "center",
              paddingTop: "100px",
              fontSize: "16px",
              margin: "0"
            }}
          >
            Select a conversation or search for a user to start chatting
          </p>
          <p
            style={{
              color: "rgb(0, 0, 0)",
              textAlign: "center",
              paddingTop: "0",
              fontSize: "14px",
              margin: "0"
            }}
          >
            (Only linked users will appear in search results)
          </p>
        </div>
      </div>
    );
  } else return (
    <div className="message-input-container">
      <div className="message-log">
        {messages.map((msg) => {
          const isCurrentUser = msg.user_id === currentUserId;
          return (
            <div
              key={msg.id}
              className={`message ${
                isCurrentUser ? "current-user" : "other-user"
              }`}
            >
              {msg.content}
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <div className="message-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Write a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default MessageInput;
