<template>
  <button
    @click="props.someFunction"
    class="m-1 p-1 bg-[#00ff00] flex justify-center items-center hover:bg-[#4af44a] rounded-[2px]"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  someFunction: () => void; // Función que se ejecutará al hacer clic
}>();
</script>

<style scoped lang="css"></style>
