<template>
  <aside
    id="sidebar-music"
    class="h-[95%] bg-[#28282860] lg:inline hidden p-6 w-80 rounded-xl mx-5 border-double border-4 border-[#1a7c1a] animate-pulseBorder"
  >
    <h2 class="text-3xl text-[#fafafa]">Mi música</h2>
    <div class="mt-2">
      <SongsGroup genre="Jazz" :songs="jazzSongs" />
      <SongsGroup genre="Sonidos binaurales" :songs="binauralSongs" />
      <SongsGroup genre="Ruido blanco" :songs="whiteNoise" />
    </div>
    <div></div>
  </aside>
</template>
<script lang="ts" setup>
import { myMusic } from '@/components/Music/composable/myMusic';
import SongsGroup from '@/components/Music/SongsGroup.vue';
const { binauralSongs, jazzSongs, whiteNoise } = myMusic();
</script>

<style scoped>
h2 {
  font-family: 'Jersey 15', serif;
  font-weight: 400;
  font-style: normal;
}
</style>
