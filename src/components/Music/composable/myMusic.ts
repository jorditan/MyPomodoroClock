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
  const volume = ref<number>(0.2);
  const audio = new Audio();
  const isMuted = ref<boolean>(false);
  const currentSong = ref<ISong | undefined>();
  audio.volume = volume.value;
  audio.loop = true;

  class Song implements ISong {
    name: string;
    id: number;
    duracion: number;
    isPlaying: boolean;
    file: string;
    genre: string;
    volume: number;

    constructor(
      name: string,
      id: number,
      duracion: number,
      file: string,
      genre: string,
      volume: number = 0.2,
      isPlaying: boolean = false,
    ) {
      this.name = name;
      this.id = id;
      this.duracion = duracion;
      this.file = file;
      this.genre = genre;
      this.volume = volume;
      this.isPlaying = isPlaying;
    }

    reproduce(): void {
      this.isPlaying = true;
      const prevSong =
        reproducedSongs.value.length > 0
          ? reproducedSongs.value[reproducedSongs.value.length - 1]
          : undefined;
      this.addToList(prevSong);
      if (prevSong !== this) {
        currentSong.value = this;
        audio.src = this.file;
        audio.volume = this.volume;
      }
      setTimeout(() => {
        audio.play();
      }, 100);
    }

    addToList(prevSong: ISong | undefined): void {
      if (prevSong != this) {
        reproducedSongs.value.push(this);
        prevSong?.pause();
      }
    }

    pause(): void {
      this.isPlaying = false;
      audio.pause();
    }
  }

  audio.addEventListener('ended', () => {
    reproducedSongs.value[reproducedSongs.value.length - 1].reproduce();
  });
  if (reproducedSongs.value.length > 0) {
    reproducedSongs.value[reproducedSongs.value.length - 1].reproduce();
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
    if (volume.value < 1) {
      volume.value = Number((volume.value + 0.2).toFixed(1));
    }
  };

  const ressVolume = (): void => {
    if (volume.value > 0) {
      volume.value = Number((volume.value - 0.2).toFixed(1));
    }
  };

  const mute = () => {
    isMuted.value = !isMuted.value;
    audio.muted = isMuted.value;
  };

  return {
    songs,
    binauralSongs,
    jazzSongs,
    whiteNoise,
    volume,
    isMuted,

    addVolume,
    mute,
    ressVolume,
  };
};
