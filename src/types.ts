export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "web" | "design" | "art" | "audio";
  tags: string[];
  description: string;
  link?: string;
  image?: string;
  color: string;
  year: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: string;
}

export interface BratConfig {
  text: string;
  blur: number;
  scaleX: number;
  bgColor: string;
  textColor: string;
  fontSize: number;
  isStretched: boolean;
}

export interface PlaylistSong {
  id: string;
  title: string;
  artist: string;
  duration: string;
  energyLevel: string; // e.g., '100% club energy', 'ambient contrast'
  isPlaying?: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
