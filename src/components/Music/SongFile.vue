<template>
  <div
    @click="handleClick()"
    class="containerSong flex gap-2 rounded-sm justify-between items-center p-1 px-3"
  >
    <div>
      <li>
        {{ props.aSong.name }}
      </li>
    </div>
    <svg
      v-if="pause"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#cacaca"
      class="icon icon-tabler icons-tabler-filled icon-tabler-player-play"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#cacaca"
      class="icon icon-tabler icons-tabler-filled icon-tabler-player-pause"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
      <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { myMusic } from './composable/myMusic';
import type { ISong } from '@/assets/interfaces/songs.interface';

const { addSong } = myMusic();
const props = defineProps<{ aSong: ISong }>();

const pause = ref<boolean>(true);

const handleClick = () => {
  pause.value = !pause.value;
  if (props.aSong.isPlaying) {
    props.aSong.pause();
  } else {
    props.aSong.reproduce();
    addSong(props.aSong);
  }
};
</script>

<style lang="css" scoped>
li {
  color: #cacaca;
  text-shadow: none;
}
</style>
