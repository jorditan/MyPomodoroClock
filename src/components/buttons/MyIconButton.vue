<template>
  <button @click="props.someFunction" class="m-1 bg-[#00ff00] rounded-sm">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  someFunction: () => void; // Función que se ejecutará al hacer clic
}>();
</script>

<style scoped lang="css"></style>
