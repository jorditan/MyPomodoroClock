<template>
  <div class="flex gap-2 justify-center items-center">
    <div class="flex"></div>
    <div class="flex gap-1 items-center flex-col">
      <p class="text-[20px]" v-if="aSong">Volumen: {{ aSong.volume }}</p>
      <p class="text-[20px]" v-else>Volumen: {{ audio.volume }}</p>
      <div class="flex gap-2 items-center justify-center">
        <Minus
          @click="props.aSong?.decrementVolume"
          :class="[
            'hover:scale-110 transition-all cursor-pointer',
            {
              enabled: aSong,
              disabled: !aSong,
            },
          ]"
          stroke="#cacaca"
          height="20"
        />
        <Plus
          @click="props.aSong?.incrementVolume"
          :class="[
            {
              enabled: aSong,
              disabled: !aSong,
            },
          ]"
          stroke="#cacaca"
          height="20"
        />
        <Volume2
          v-if="!props.aSong?.isMuted"
          stroke="#cacaca"
          height="20"
          @click="muteAllSongs(props.songs)"
          :class="[
            {
              enabled: aSong,
              disabled: !aSong,
            },
          ]"
        />
        <VolumeOff
          v-else
          stroke="#cacaca"
          height="20"
          @click="desmuteAllSongs(props.songs)"
          :class="[
            {
              enabled: aSong,
              disabled: !aSong,
            },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISong } from '@/assets/interfaces/songs.interface';
import { Plus } from 'lucide-vue-next';
import { Minus } from 'lucide-vue-next';

import { Volume2 } from 'lucide-vue-next';
import { VolumeOff } from 'lucide-vue-next';
import { myMusic } from '@/components/Music/composable/myMusic';

const props = defineProps<{ aSong: ISong | undefined; songs: ISong[] }>();

const { audio, muteAllSongs, desmuteAllSongs } = myMusic();
</script>

<style lang="css" scoped>
p {
  color: #fafafa;
  text-shadow: none;
}

.disabled {
  @apply stroke-[#d9d9d967] cursor-not-allowed;
}

.enabled {
  @apply hover:scale-110 transition-all stroke-[#cacaca] cursor-pointer;
}
</style>
