export interface ISong {
  id: number;
  name: string;
  file: string;
  genre: string;
  volume: number;
  duracion: number;
  isPlaying: boolean;
  isMuted: boolean;
  reproduce: () => void;
  pause: () => void;
  mute: () => void;
  desmute: () => void;
  incrementVolume: () => void;
  decrementVolume: () => void;
}
