<template>
  <section
    aria-label="Pomodoro section"
    class="w-full rounded-xl p-6 mr-5 m-auto bg-[#28282860] text-center h-[95%] my-5 items-center border-double border-4 border-[#1a7c1a]"
  >
    <div class="flex flex-col items-center">
      <h1 id="tittle" class="text-7xl text-[#fafafa]">
        I love pomodoro <small class="text-[48px] shadow-none">❤️</small>
      </h1>
      <p class="text-slate-300 text-[20px]">{{ actualStatus }}</p>
    </div>

    <article id="myClock" class="mt-5">
      <h2 class="text-8xl text-[#fafafa]">{{ formattedMinutes }}:{{ formattedSeconds }}</h2>

      <div class="flex gap-4 justify-center mt-5 flex-col items-center">
        <button @click="handleStatus" class="buttons w-[220px] aling-center">
          {{ text[actualStatus] }}
        </button>
        <ChangueModal
          tittle="Cambiar tiempo límite"
          :status="actualStatus"
          @change-limit="defineLimit"
          :errorMessage="errorVisible"
        />
      </div>

      <div
        v-if="actualStatus == Status.counting || actualStatus == Status.break"
        class="bg-[#181717] w-[320px] m-auto mt-5 text-left"
      >
        <div
          id="progress"
          class="bg-[#00ff00] flex justify-end transition-all"
          :style="{ width: `${porcentaje}%` }"
        >
          <small class="text-gray-900">{{ porcentaje }}%</small>
        </div>
      </div>

      <p class="text-[20px] mt-5">Llevas realizadas: {{ totalRounds }} ronda/s de pomodoro</p>
      <p class="text-[16px]">0 descanso/s</p>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Status } from './status';
import { useMyTimer } from './useMyTimer';
import ChangueModal from './Modals/ChangueModal/ChangueModal.vue';

const {
  formattedSeconds,
  formattedMinutes,
  actualStatus,
  totalRounds,
  transcorredMinutes,
  errorVisible,

  handleStatus,
  defineLimit,
} = useMyTimer();

const text = {
  [Status.counting]: 'PAUSA',
  [Status.waiting]: 'COMENZAR',
  [Status.break]: 'DESPAUSAR',
  [Status.finish]: 'DESCANSAR',
};

const porcentaje = ref<number>(0);

watch(transcorredMinutes, (newTrasncurred) => {
  porcentaje.value = Math.round((newTrasncurred / 25) * 100);
});
</script>

<style>
html {
  font-family: 'Jersey 15', serif;
  font-weight: 400;
  font-style: normal;
}

h2 {
  font-family: 'Rubik 80s Fade', serif;
  font-weight: 400;
  font-style: normal;
}

small {
  text-shadow: none;
}

.buttons {
  @apply text-[24px] rounded-sm text-[#000000] bg-[#00ff00] px-6 py-2 backdrop-blur-lg;
}

.buttons {
  box-shadow: 0 0 8px #00ff00;
}

#progress {
  box-shadow: 0 0 8px #00ff00;
}

#tittle {
  display: block;
  white-space: nowrap;
  border-right: 4px solid;
  width: 18ch;
  overflow: hide;
  animation:
    escribiendo 3s steps(17),
    puntero 3s steps(17) forwards;
  overflow: hidden;
}

@keyframes escribiendo {
  from {
    width: 0;
  }
  to {
    width: 18ch;
  }
}
@keyframes puntero {
  0% {
    border-right: 4px solid #00ff00;
  }
  100% {
    border-right: 4px solid transparent;
  }
}
</style>
