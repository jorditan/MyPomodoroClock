<template>
  <div>hola mundo</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMyTimer } from '../../useMyTimer';
import { Status } from '../../status';
const { actualStatus } = useMyTimer();
const visible = ref<boolean>(false);
console.log(visible.value);
watch(actualStatus, (newStatus) => {
  if (newStatus == Status.finish) {
    visible.value = true;
  }
});
</script>

<style lang="scss" scoped></style>
