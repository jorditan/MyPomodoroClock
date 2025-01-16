<template>
  <button class="underline text-[#00ff00]" @click="handleVisible">
    ¿Deseas cambiar el tiempo límite?
  </button>
  <div v-if="isVisible" class="modalOverlay">
    <div
      id="modal"
      class="bg-[#000000] w-[24rem] h-[18rem] flex justify-between flex-col absolute rounded-sm border-double border-4 border-[#1a7c1a] animate-pulseBorder p-4"
    >
      <div class="flex justify-between">
        <h2 class="text-lg">{{ props.tittle }}</h2>
        <svg
          @click="handleVisible"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-x cursor-pointer"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </div>
      <div class="flex justify-between">
        <button class="btnSecondary w-fit p-2 text-[12px] aling-center" @click="handleVisible">
          Cancelar
        </button>
        <button
          class="buttons btnPrimary w-fit p-2 text-[12px] aling-center"
          @click="handleVisible"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps(['tittle']);

const isVisible = ref<boolean>(false);

const handleVisible = () => {
  isVisible.value = !isVisible.value;
};
</script>

<style lang="css" scoped>
.modalOverlay {
  position: fixed; /* Cubre toda la pantalla */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Negro con opacidad al 85% */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6); /* Sombra más marcada */
  max-width: 500px;
  width: 90%;
}

.btnPrimary {
  @apply text-[16px];
}

.btnSecondary {
  @apply text-[16px] text-[#00ff00] px-2;
}
</style>
