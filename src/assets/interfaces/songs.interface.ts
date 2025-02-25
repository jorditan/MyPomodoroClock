export interface ISong {
  id: number;
  name: string;
  file: string;
  genre: string;
  duracion: number;
  isPlaying: boolean;
  isMuted: boolean;
  reproduce: () => void;
  pause: () => void;
  mute: () => void;
  desmute: () => void;
}
