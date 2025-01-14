<script setup lang="ts">
import SidebarLayout from './assets/modules/sidebar/SidebarLayout.vue';
import MyTimerLayout from './assets/modules/timer/MyTimerLayout.vue';
</script>

<template>
  <div class="flex items-center h-[100vh] bg" id="container">
    <SidebarLayout />
    <MyTimerLayout />
  </div>
</template>

<style scoped>
#container {
  /* background-image: url('https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?cs=srgb&dl=pexels-philippedonn-1169754.jpg&fm=jpg'); */
  object-fit: fill;
  background-size: cover;
}

#container {
  background: linear-gradient(to top, #000000, #000000, #153022, #407964);
  background-size: cover;
  background-size: 100% 1px;
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00;
}

@media screen {
  #container {
    animation: scanlines infinite 55s linear;
  }
}
@keyframes scanlines {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 -10px;
  }
}
</style>
