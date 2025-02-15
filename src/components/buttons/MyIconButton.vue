<template>
  <button @click="props.someFunction" class="m-1 p-1 hover:bg-[#a8e3a858] rounded-[2px]">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  someFunction: () => void; // Función que se ejecutará al hacer clic
}>();
</script>

<style scoped lang="css"></style>
