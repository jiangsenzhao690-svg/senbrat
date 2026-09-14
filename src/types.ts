export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'design' | 'art' | 'web' | 'audio';
  tags: string[];
  description: string;
  color: string;
  year: string;
  link: string;
  image: 'collage' | 'rave-android' | 'studio-android' | 'brat-chair' | 'synth' | 'audio-filter';
}

export interface Skill {
  name: string;
  level: number;
  category: 'Code' | 'Vibe';
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  energyLevel: string;
}

export interface MessageLog {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface ColorPreset {
  name: string;
  bg: string;
  text: string;
  blur: number;
  scaleX: number;
  label: string;
}
