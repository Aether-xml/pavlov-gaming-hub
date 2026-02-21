// types/index.ts

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  publishedAt: string;
  channelTitle: string;
  viewCount?: string;
  duration?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string;
  favorite_game: string;
  total_play_time: number;
  member_since: string;
  is_online: boolean;
  last_seen: string;
}

export interface Score {
  id: string;
  user_id: string;
  game_slug: "pavroyale" | "pavometry";
  score: number;
  level_reached: number;
  play_duration: number;
  verified: boolean;
  created_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  score: number;
  level_reached: number;
  played_at: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface GameInfo {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  genre: string;
  color: string;
  accentColor: string;
  features: string[];
}