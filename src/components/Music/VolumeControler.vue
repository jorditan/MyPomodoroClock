<template>
  <div class="flex gap-2 justify-center items-center">
    <div class="flex"></div>
    <div class="flex gap-1 items-center">
      <p class="text-[20px]">Volumen: {{ volume }}</p>
      <Volume2
        v-if="!props.aSong?.isMuted"
        stroke="#cacaca"
        height="20"
        @click="props.aSong?.mute()"
        class="m-1 hover:fill-[#fafafa] transition-all"
      />
      <VolumeOff
        v-else
        stroke="#cacaca"
        height="20"
        @click="props.aSong?.desmute()"
        class="m-1 hover:fill-[#fafafa] transition-all"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISong } from '@/assets/interfaces/songs.interface';
import MyIconButton from '../buttons/MyIconButton.vue';
import { Volume2 } from 'lucide-vue-next';
import { VolumeOff } from 'lucide-vue-next';
import { myMusic } from '@/components/Music/composable/myMusic';

const props = defineProps<{ aSong: ISong | undefined }>();

const { volume, isMuted } = myMusic();
</script>

<style lang="css" scoped>
p {
  color: #fafafa;
  text-shadow: none;
}
</style>
