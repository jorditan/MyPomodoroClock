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
      console.log(
        `Se está reproduciendo la canción ${this.name} - archivo: ${this.file} - sonando = ${this.isPlaying}`,
      );
    }

    pause(): void {
      this.isPlaying = false;
      console.log(
        `Se pausó la canción ${this.name} - archivo: ${this.file} - Sonando = ${this.isPlaying}`,
      );
    }
  }

  const addSong = (aSong: Song) => {
    reproducedSongs.value.push(aSong);
  };

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

  return {
    songs,
    binauralSongs,
    jazzSongs,
    whiteNoise,

    addSong,
  };
};
