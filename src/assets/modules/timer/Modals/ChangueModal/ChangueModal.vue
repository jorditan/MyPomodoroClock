<template>
  <button
    :class="[
      {
        counting: props.status != Status.waiting,
        noCounting: props.status == Status.waiting,
      },
    ]"
    @click="handleVisible"
  >
    ¿Deseas cambiar el tiempo límite?
  </button>

  <div v-if="isVisible" class="modalOverlay">
    <div
      id="modal"
      class="bg-[#000000] w-[24rem] h-auto gap-4 flex flex-col justify-around absolute rounded-sm border-double border-4 border-[#1a7c1a] animate-pulseBorder p-4"
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
      <div class="flex gap-2 flex-col">
        <div class="flex gap-2 items-start flex-col">
          <label class="text-[16px]" for="minutes">Minutos: </label>
          <input
            class="bg-[#282828] text-[20px] w-full border-1 focus:border-[#1a7c1a] rounded-sm border-[#1a7c1a] animate-pulseBorder"
            type="number"
            id="minutes"
            name="minutes"
            placeholder="Ingrese un nuevo límite de tiempo"
            v-model="inputValue"
          />
        </div>
        <MessageError message="No puedes ingresar más de 60 minutos" :is-visible="errorVisible" />
      </div>
      <div class="flex justify-between mt-1">
        <button class="btnSecondary w-fit p-2 text-[12px] aling-center" @click="handleVisible">
          Cancelar
        </button>
        <button
          class="buttons btnPrimary w-fit p-2 text-[12px] aling-center"
          @click="
            handleClick();
            handleVisible();
          "
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { Status } from '../../status';
import { useMyTimer } from '@/assets/modules/timer/useMyTimer';
import MessageError from '@/components/Messages/Error/MessageError.vue';
const { errorVisible } = useMyTimer();

const inputValue = ref<number>();

const props = defineProps({ tittle: String, status: String });
const isVisible = ref<boolean>(false);

const handleVisible = () => {
  if (props.status == Status.waiting) {
    if (isVisible.value && errorVisible.value) {
    } else {
      isVisible.value = !isVisible.value;
    }
    inputValue.value = undefined;
  }
};

const emit = defineEmits(['change-limit']);
const handleClick = () => {
  emit('change-limit', inputValue.value);
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
}

.noCounting {
  @apply underline text-[#00ff00];
}
</style>
