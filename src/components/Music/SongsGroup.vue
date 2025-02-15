<template>
  <div class="mt-2">
    <p class="text-[18px]">
      {{ props.genre }}
    </p>
    <hr />

    <ul id="songs" class="flex gap-2 mt-2 flex-col w-full rounded-sm">
      <div v-for="song in props.songs" :key="song.id">
        <SongFile :a-song="song" />
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ISong } from '@/assets/interfaces/songs.interface';
import SongFile from './SongFile.vue';

const props = defineProps<{
  genre: string;
  songs: ISong[];
}>();
</script>

<style lang="css" scoped>
.containerSong:hover {
  background-color: #1a7c1a78;
}
hr {
  border-color: #1a7c1a;
}
</style>
