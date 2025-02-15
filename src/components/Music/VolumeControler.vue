<template>
  <div class="flex gap-2 justify-center items-center">
    <div class="flex">
      <MyIconButton :some-function="ressVolume">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00ff00"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-minus"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
        </svg>
      </MyIconButton>
      <MyIconButton :some-function="addVolume">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00ff00"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
      </MyIconButton>
    </div>
    <div class="flex gap-1 items-center">
      <p>Volumen: {{ volume }}</p>
      <Volume2
        v-if="!isMuted"
        stroke="#cacaca"
        height="20"
        :onclick="mute"
        class="m-1 hover:fill-[#fafafa] transition-all"
      />
      <VolumeOff
        v-else
        stroke="#cacaca"
        height="20"
        :onclick="mute"
        class="m-1 hover:fill-[#fafafa] transition-all"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MyIconButton from '../buttons/MyIconButton.vue';
import { myMusic } from './composable/myMusic';
import { Volume2 } from 'lucide-vue-next';
import { VolumeOff } from 'lucide-vue-next';

const { volume, isMuted, addVolume, ressVolume, mute } = myMusic();
</script>

<style lang="css" scoped>
p {
  color: #fafafa;
  text-shadow: none;
}
</style>
