export interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'web' | 'design' | 'art' | 'audio';
  tags: string[];
  description: string;
  color: string;
  year: string;
  link: string;
  image: 'collage' | 'rave-android' | 'studio-android' | 'brat-chair' | 'synth' | 'audio-filter';
}

export interface SkillItem {
  name: string;
  level: number;
  category: 'Code' | 'Vibe';
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  energyLevel: string;
}

export interface ColorPreset {
  name: string;
  bg: string;
  text: string;
  blur: number;
  scaleX: number;
  label: string;
}

export interface NavSection {
  id: string;
  label: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
