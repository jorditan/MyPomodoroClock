<template>
  <aside
    class="h-[95%] bg-[#28282860] p-6 w-80 rounded-xl mx-5 border-double border-4 border-[#1a7c1a] animate-pulseBorder"
  >
    <h2 class="text-3xl text-[#fafafa]">Mi música</h2>
    <div class="mt-2">
      <SongsGroup genre="Jazz" />
      <SongsGroup genre="Sonidos binaurales" />
      <SongsGroup genre="Ruido blanco" />
    </div>
    <div></div>
  </aside>
</template>
<script lang="ts" setup>
import SongsGroup from '@/components/Music/SongsGroup.vue';
</script>

<style scoped>
h2 {
  font-family: 'Jersey 15', serif;
  font-weight: 400;
  font-style: normal;
}
</style>
