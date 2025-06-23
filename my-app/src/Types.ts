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