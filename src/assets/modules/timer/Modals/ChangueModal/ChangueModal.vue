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
      class="bg-[#000000] sm:w-[24rem] w-[20rem] h-auto gap-4 flex flex-col justify-around absolute rounded-sm border-double border-4 border-[#1a7c1a] animate-pulseBorder p-4"
    >
      <div class="flex justify-between">
        <h2 class="text-2xl">{{ props.tittle }}</h2>
        <X @click="handleVisible" stroke="currentColor" class="cursor-pointer" />
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
        <MessageError :is-visible="props.errorMessage" :message="errorMessageComputed" />
      </div>
      <div class="flex justify-between mt-1">
        <button
          class="btnSecondary w-fit p-2 text-[12px] aling-center hover:bg-[#a8e3a858] rounded-sm transition-all"
          @click="handleVisible"
        >
          Cancelar
        </button>
        <button
          class="buttons btnPrimary w-fit p-2 text-[12px] aling-center hover:bg-[#4af44a] transition-all"
          @click="handleClick()"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue';
import { Status } from '../../../../interfaces/status';
import { X } from 'lucide-vue-next';
import MessageError from '@/components/Messages/Error/MessageError.vue';

const inputValue = ref<number>();
const previousInput = ref<number | undefined>(undefined);

const props = defineProps({ tittle: String, status: String, errorMessage: Boolean });
const isVisible = ref<boolean>(false);

const handleVisible = () => {
  if (props.status == Status.waiting) {
    isVisible.value = !isVisible.value;
    inputValue.value = undefined;
  }
};

const errorVisible = computed(() => {
  return props.errorMessage;
});

const emit = defineEmits(['change-limit']);

const handleClick = async () => {
  if (props.status == Status.waiting) {
    await emit('change-limit', inputValue.value);
    if (isVisible.value && !errorVisible.value) {
      isVisible.value = !isVisible.value;
    }
    previousInput.value = inputValue.value;
    inputValue.value = undefined;
  }
};

const errorMessageComputed = computed(() => {
  if (previousInput.value !== undefined && errorVisible) {
    if (previousInput.value >= 60) {
      return 'No puedes realizar más de 60 minutos de pomodoro';
    }
    if (previousInput.value <= 0) {
      return 'Ingrese más de 0 minutos';
    }
  }
  return '';
});
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
