import type { Song } from '@/assets/interfaces/songs.interface';
import { ref } from 'vue';

export const myMusic = () => {
  const songs = ref<Song[]>([
    {
      id: 0,
      name: 'Coffe jazz',
      file: '../URL',
    },
  ]);

  return {
    songs,
  };
};
