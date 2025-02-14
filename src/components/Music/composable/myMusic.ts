import type { ISong } from '@/assets/interfaces/songs.interface';
import { ref } from 'vue';
import coffeeJazz from '@/assets/songs/Coffe jazz.mp3';
import goodMorning from '@/assets/songs/Good morning.mp3';
import vintage from '@/assets/songs/Vintage mood.mp3';
import intenseFocus from '@/assets/songs/Intense focus.mp3';
import powerFocus from '@/assets/songs/Power & Focus.mp3';
import meditation from '@/assets/songs/Meditation.mp3';
import relax from '@/assets/songs/Relax.mp3';
import rainSound from '@/assets/songs/Rain sound.mp3';
import nothing from '@/assets/songs/Just nothing.mp3';

export const myMusic = () => {
  const reproducedSongs = ref<ISong[]>([]);
  const volumen = ref<number>(0.2);
  const audio = new Audio();
  const isMuted = ref<boolean>(false);
  const currentSongFile = ref('');
  audio.volume = volumen.value;
  audio.loop = true;

  class Song implements ISong {
    name: string;
    id: number;
    duracion: number;
    isPlaying: boolean;
    file: string;
    genre: string;

    constructor(
      name: string,
      id: number,
      duracion: number,
      file: string,
      genre: string,
      isPlaying: boolean = false,
    ) {
      this.name = name;
      this.id = id;
      this.duracion = duracion;
      this.file = file;
      this.genre = genre;
      this.isPlaying = isPlaying;
    }

    reproduce(): void {
      this.isPlaying = true;
      const prevSong = reproducedSongs.value[reproducedSongs.value.length - 1];
      this.addToList(prevSong);
      if (prevSong !== this) {
        currentSongFile.value = this.file; // 🔹 Guardamos la referencia en Vue
        audio.pause();
        audio.src = this.file;
      }
      setTimeout(() => {
        audio.play();
      }, 100);
    }

    addToList(prevSong: ISong): void {
      if (prevSong != this) {
        reproducedSongs.value.push(this);
        if (prevSong != undefined) {
          prevSong.pause();
        }
      }
    }

    pause(): void {
      this.isPlaying = false;
      audio.pause();
    }
  }

  const songs = ref<Song[]>([
    new Song('Vintage mood', 1, 180, vintage, 'Jazz'),
    new Song('Coffe jazz', 2, 200, coffeeJazz, 'Jazz'),
    new Song('Good morning', 3, 500, goodMorning, 'Jazz'),
    new Song('Intense focus', 4, 200, intenseFocus, 'Binaural'),
    new Song('Power & Focus', 5, 200, powerFocus, 'Binaural'),
    new Song('Meditation', 6, 230, meditation, 'Binaural'),
    new Song('Just nothing', 7, 1000, nothing, 'Ruido blanco'),
    new Song('Rain sound', 8, 815, rainSound, 'Ruido blanco'),
    new Song('Relax', 9, 523, relax, 'Ruido blanco'),
  ]);

  const binauralSongs = songs.value.filter((song) => {
    return song.genre == 'Binaural';
  });

  const jazzSongs = songs.value.filter((song) => {
    return song.genre == 'Jazz';
  });

  const whiteNoise = songs.value.filter((song) => {
    return song.genre == 'Ruido blanco';
  });

  const addVolume = (): void => {
    if (volumen.value < 1) {
      volumen.value = Number((volumen.value + 0.2).toFixed(1));
    }
    audio.volume = volumen.value;
  };

  const ressVolume = (): void => {
    if (volumen.value > 0) {
      volumen.value = Number((volumen.value - 0.2).toFixed(1));
    }
  };

  const muteMusic = () => {
    if (!audio.src) {
      console.warn('⚠ No hay ninguna canción reproduciéndose.');
      return;
    }

    isMuted.value = !isMuted.value;
    audio.muted = isMuted.value;
  };

  return {
    songs,
    binauralSongs,
    jazzSongs,
    whiteNoise,
    volumen,
    isMuted,

    addVolume,
    ressVolume,
    muteMusic,
  };
};
