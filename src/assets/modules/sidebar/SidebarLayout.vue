<template>
  <div v-if="isSidebarOpen" class="overlay lg:hidden" @click="isSidebarOpen = false"></div>
  <div
    v-if="!isSidebarOpen"
    @click="openFromHandle"
    class="w-[3rem] h-[3rem] rounded-sm bg-[#00ff00] flex justify-center items-center hover:bg-[#4af44a] transition-all cursor-pointer right-[12%] absolute z-20 bottom-[8%] sm:right-[8%] lg:hidden"
  >
    <AudioLines stroke="#282828" class="h-[32px] w-[32px]" />
  </div>
  <aside
    id="sidebar-music"
    class="h-[95%] z-[1001] bg-[#28282824] p-2 lg:p-6 w-[95%] lg:w-80 rounded-xl m-2 lg:mx-5 absolute lg:relative border-double border-4 border-[#1a7c1a] animate-pulseBorder transition-transform duration-300 ease-in-out"
    :class="{
      hidden: !isSidebarOpen,
      block: isSidebarOpen,
      'lg:inline bg-[#282828f1]': true,
      'disable-effects': openFromHandle,
    }"
  >
    <div class="flex gap-2 items-center">
      <SquareChevronLeft
        v-if="isSidebarOpen"
        stroke="#00ff00"
        @click="openFromHandle"
        class="cursor-pointer"
      />
      <h2 class="text-3xl text-[#fafafa]">Mi música</h2>
    </div>
    <div class="mt-2">
      <SongsGroup genre="Jazz" :songs="jazzSongs" />
      <SongsGroup genre="Sonidos binaurales" :songs="binauralSongs" />
      <SongsGroup genre="Ruido blanco" :songs="whiteNoise" />
      <VolumeControler class="mt-5" :a-song="currentSong" :songs="songs" />
    </div>
    <div></div>
  </aside>
</template>
<script lang="ts" setup>
import { AudioLines } from 'lucide-vue-next';
import { myMusic } from '@/components/Music/composable/myMusic';
import { ref } from 'vue';
import VolumeControler from '@/components/Music/VolumeControler.vue';
import SongsGroup from '@/components/Music/SongsGroup.vue';
import { SquareChevronLeft } from 'lucide-vue-next';

const { binauralSongs, jazzSongs, whiteNoise, currentSong, songs } = myMusic();
const isSidebarOpen = ref<boolean>(false);
const openedFromHandle = ref<boolean>(false);

const openFromHandle = (): void => {
  isSidebarOpen.value = !isSidebarOpen.value;
  openedFromHandle.value = isSidebarOpen.value;
};
</script>

<style scoped>
h2 {
  font-family: 'Jersey 15', serif;
  font-weight: 400;
  font-style: normal;
}

#sidebar-music {
  box-shadow: inset 0px 0px 1.2rem;
  background-image: linear-gradient(0deg, #0000 10%, #fff1 90%, #0000 100%);
  animation: crtAnimation 300s linear infinite;
  background-size: 100% 80%;
  mask-image: linear-gradient(to bottom, #0005 50%, #000 50%);
  mask-size: 100% 2px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

#sidebar-music {
  box-shadow: inset 0px 0px 1.2rem;
  background-image: linear-gradient(0deg, #0000 10%, #fff1 90%, #0000 100%);
  animation: crtAnimation 300s linear infinite;
  background-size: 100% 80%;
  mask-image: linear-gradient(to bottom, #0005 50%, #000 50%);
  mask-size: 100% 2px;
}

.disable-effects {
  box-shadow: none !important;
  mask-image: none !important;
}
</style>
