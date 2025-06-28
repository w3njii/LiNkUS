import "../../styles/components/message/MessageSearch.css";

interface MessageSearchProps {
  value: string;
  onChange: (value: string) => void;
}

function MessageSearch(search: MessageSearchProps) {
  const { value, onChange } = search;
  return (
    <div className="message-search-container">
      <input
        type="text"
        placeholder="Search chats..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default MessageSearch;
