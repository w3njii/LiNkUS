export interface Message {
    id: string;
    user_id: string;
    recipient_id: string; 
    content: string;
    created_at: string;
    username?: string;
    avatar_url?: string;
};
  
export type Friend = {
  id: string;
  username: string;
  lastMessage: string | null;
};
  
export interface UserProfileSearch {
  user_id: string;
  name: string;
  username: string;
  avatar_url: string | null;
};

export interface IUserProfileDisplay {
  name: string;
  username: string;
  bio?: string | null;
  avatar_url?: string | null;
}