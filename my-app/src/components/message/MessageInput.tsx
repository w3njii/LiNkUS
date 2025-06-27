import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../App";
import { Message } from '../../Types';


function MessageInput({ recipientId }: { recipientId: string }) : React.JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    fetchUser();
  }, []);

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

    const { data: { user } } = await supabase.auth.getUser();
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
    content: input.trim(),
    username: user.user_metadata?.username || "anonymous",
    avatar_url: user.user_metadata?.avatar_url || "",
    created_at: new Date().toISOString()
  };

  setMessages((prev: Message[]) => [...prev, userMsg]);

  const { error } = await supabase.from("messages").insert({
    user_id: user.id,
    recipient_id: recipientId,
    content: userMsg.content,
    username: userMsg.username,
    avatar_url: userMsg.avatar_url
  });

    if (error) console.error("Something went wrong!!!", error);

    // setTimeout(() => {
    //   const botMsg: Message = {
    //     id: messages.length + 2,
    //     sender: "other user",
    //     content: `not implemented yet:`,
    // };

    // setMessages((prev: Message[]) => [...prev, botMsg]);
    // }, 500);

    setInput("");
  };


  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        <h2>Chat Messages</h2>
        <div
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                height: "500px",
                overflowY: "auto",
                marginBottom: "10px",
            }}
        >
        {messages.map((msg) => {
            const isCurrentUser = !!currentUserId && msg.user_id === currentUserId;

            return (
                <div
                    key={msg.id}
                    style={{
                        display: "flex",
                        // position: isPinMessage(msg.id) ? "sticky" : "relative",
                        // justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                        backgroundColor: isCurrentUser ? "#abcdef" : "#f8d7da",
                        maxWidth: "60%",
                        width: "fit-content", 
                        padding: "10px",
                        margin: "5px 0",
                        wordBreak: "break-word",
                        marginLeft: isCurrentUser ? "auto" : "0",
                        marginRight: isCurrentUser ? "auto" : "0", 
                        color: "black",
                    }}
                >
                {msg.content}
                </div>
            );
        })}
        </div>
        <div style={{display: "flex"}}><input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{ width: "80%", marginRight: "10px" }}/>
            <button onClick={sendMessage} style={{width: "20%"}}>Send</button>
        </div>
    </div>
  );
}

export default MessageInput;