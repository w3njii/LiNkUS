export interface Message {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    username?: string;
    avatar_url?: string;
  }
  
  export type Friend = {
    id: string;
    username: string;
  };
  
export interface IUserProfile {
  username: string;
}

export interface ChatListProps {
  onSelect: (id: string) => void;
  friends: Friend[];
  currentUserId: string;
}

export interface UserProfileProps {
  name?: string;
  username: string;
  bio?: string;
  avatarUrl: string;
  location?: string;
  interests?: string[];
  classes?: string[];
}

export type RecentChatRow = {
  friend_id: string;
  friend_username: string;
  friend_avatar_url: string | null;
  last_message: string;
};

export interface Event {
  id: number;
  name: string;
  start_date: string;
  mode: string | null;
  image_link: string | null;
}