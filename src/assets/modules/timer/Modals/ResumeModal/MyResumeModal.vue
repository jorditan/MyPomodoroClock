<template>
  <button
    :class="[
      'secondary w-[220px] aling-center ',
      {
        enabled: canShow(),
        disabled: !canShow(),
      },
    ]"
    @click="handleVisible"
  >
    GENERAR RESUMEN
  </button>
  <div v-if="isVisible" class="modalOverlay">
    <div
      id="modalResume"
      class="bg-[#000000] w-[24rem] h-auto gap-4 flex flex-col justify-around absolute rounded-sm border-double border-4 border-[#1a7c1a] animate-pulseBorder p-4"
    >
      <div class="flex justify-between">
        <h2 class="text-2xl">{{ props.tittle }}</h2>
        <X @click="handleVisible" stroke="currentColor" class="cursor-pointer" />
      </div>
      <div class="flex gap-2 flex-col">
        <div class="flex gap-2 items-start flex-col">
          <p>En total has estado {{ props.resumeMinutes }} minutos concentrado</p>
          <p>Además, has descansado {{ props.resumeBreak }} minutos</p>
        </div>
      </div>
      <div class="flex justify-end mt-1">
        <button
          class="buttons btnPrimary w-fit p-2 text-[12px] aling-center hover:bg-[#4af44a] transition-all"
          @click="handleVisible"
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { X } from 'lucide-vue-next';
import { Status } from '@/assets/interfaces/status';

const props = defineProps({
  status: String,
  tittle: String,
  resumeBreak: Number,
  resumeMinutes: Number,
});

const isVisible = ref<boolean>(false);

const handleVisible = () => {
  if (canShow()) {
    isVisible.value = !isVisible.value;
  }
};

const canShow = () => {
  return (
    props.status != Status.counting &&
    props.status != Status.resting &&
    props.status != Status.breakRest
  );
};
</script>

<style lang="css" scoped>
.modalOverlay {
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

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:focus {
  border: 2px red;
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

.counting {
  color: #00ff0052;
  cursor: not-allowed;
  transition: all;
}

.noCounting {
  @apply underline text-[#00ff00];
}
</style>
