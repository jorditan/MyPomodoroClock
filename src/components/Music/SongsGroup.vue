<template>
  <div class="mt-2">
    <p class="text-[18px]">
      {{ props.genre }}
    </p>
    <hr />

    <ul id="songs" class="flex gap-1 mt-2 flex-col w-full rounded-sm">
      <SongFile name="Hola" />
      <SongFile name="Hola" />
      <SongFile name="Hola" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import SongFile from './SongFile.vue';

const props = defineProps({ genre: String, songs: Array });
</script>

<style lang="css" scoped>
.containerSong:hover {
  background-color: #1a7c1a78;
}
hr {
  border-color: #1a7c1a;
}
</style>
