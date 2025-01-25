<template>
  <div v-if="props.isVisible" class="flex gap-1 justify-start items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e02424"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 9v4" />
      <path d="M12 16v.01" />
    </svg>
    <p class="error text-red-600 shadow-none" id="error">No puedes ingresar más de 60 minutos</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  isVisible: Boolean,
});
</script>

<style scoped>
#error {
  text-shadow: none;
  box-shadow: none;
}
</style>
