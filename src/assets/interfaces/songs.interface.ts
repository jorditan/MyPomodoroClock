export interface ISong {
  id: number;
  name: string;
  file: string;
  genre: string;
  duracion: number;
  isPlaying: boolean;
  reproduce: () => void;
  pause: () => void;
}
