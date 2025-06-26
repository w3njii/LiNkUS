interface MessageSearchProps {
  value: string;
  onChange: (value: string) => void;
}

function MessageSearch(search : MessageSearchProps){
  const { value, onChange } = search;
  return (
    <div style={{ padding: "10px" }}>
      <input
        type="text"
        placeholder="Search chats..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          backgroundColor: "#222",
          color: "#fff",
        }}
      />
    </div>
  );

} 

export default MessageSearch;