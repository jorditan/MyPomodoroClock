<template>
  <section
    id="pomodoro-container"
    aria-label="Pomodoro section"
    class="w-full w lg:rounded-xl lg:mr-5 bg-[#28282860] text-center h-[100%] p-6 lg:h-[95%] lg:my-5 items-center lg:p-6"
  >
    <div class="flex flex-col items-center">
      <h1 id="tittle" class="text-4xl sm:text-7xl text-[#fafafa]">
        I love pomodoro <small class="sm:text-[2.5rem] text-[1.5rem] shadow-none">❤️</small>
      </h1>
      <p class="text-slate-300 text-[20px] animate-pulse">{{ actualStatus }}</p>
    </div>

    <article id="myClock" class="sm:mt-5">
      <h2 class="text-8xl font-bold text-[#fafafa]">
        {{ isResting() ? breakMinutes : formattedMinutes }}:{{ formattedSeconds }}
      </h2>

      <div class="flex gap-4 justify-center mt-5 flex-col items-center">
        <div class="flex flex-col gap-6">
          <button
            @click="handleStatus"
            class="buttons w-[220px] aling-center hover:bg-[#4af44a] transition-all"
          >
            {{ text[actualStatus] }}
          </button>
          <MyResumeModal
            tittle="Resumen de mi pomodoro"
            :resume-minutes="resumeMinutes"
            :resume-break="resumeBreak"
            :status="actualStatus"
          />
        </div>
        <TimeChange
          v-if="actualStatus == Status.waiting"
          tittle="Personalizar tiempo"
          :status="actualStatus"
          @change-limit="defineLimit"
          :errorMessage="errorVisible"
        />
        <BreakChange
          v-if="actualStatus == Status.finish"
          tittle="Personalizar tiempo"
          :status="actualStatus"
          @change-break="defineBreak"
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

      <div class="w-full md:w-[50%] m-auto">
        <p class="text-[20px] md:text-[24px] mt-5">
          Llevas realizadas: {{ totalRounds }} ronda/s de pomodoro
        </p>
        <p class="text-[20px]">{{ totalBreaks }} descanso/s</p>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Status } from '../../interfaces/status';
import { useMyTimer } from './composables/useMyTimer';
import TimeChange from './Modals/ChangueModal/TimeChange.vue';
import MyResumeModal from './Modals/ResumeModal/MyResumeModal.vue';
import BreakChange from './Modals/ChangueModal/BreakChange.vue';

const {
  formattedSeconds,
  formattedMinutes,
  breakMinutes,
  actualStatus,
  totalRounds,
  totalBreaks,
  transcorredMinutes,
  errorVisible,
  total,
  resumeMinutes,
  resumeBreak,

  handleStatus,
  defineLimit,
  defineBreak,
} = useMyTimer();

const text = {
  [Status.counting]: 'PAUSA',
  [Status.waiting]: 'COMENZAR',
  [Status.break]: 'DESPAUSAR',
  [Status.finish]: 'DESCANSAR',
  [Status.resting]: 'PAUSA',
  [Status.breakRest]: 'DESPAUSAR',
};

const porcentaje = ref<number>(0);

watch(transcorredMinutes, (newTrasncurred) => {
  porcentaje.value = Math.round((newTrasncurred / total.value) * 100);
});

const isResting = () => {
  return (
    actualStatus.value != Status.break &&
    actualStatus.value != Status.counting &&
    actualStatus.value != Status.waiting
  );
};
</script>

<style>
html {
  font-family: 'Jersey 15', serif;
  font-weight: 400;
  font-style: normal;
}

h2 {
  font-family: 'VT323', serif;
  font-weight: 400;
  font-style: normal;
}

small {
  text-shadow: none;
}

.buttons {
  @apply text-[24px] rounded-sm text-[#000000] bg-[#00ff00] px-6 py-2 backdrop-blur-lg;
}

.secondary {
  @apply text-[24px] rounded-sm text-[#cacaca] border-2;
}

.enabled {
  @apply hover:text-[#00ff00] hover:border-[#00ff00];
}

@keyframes crtAnimation {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 10000%;
  }
}

#pomodoro-container {
  box-shadow: inset 0px 0px 1.2rem;
  background-image: linear-gradient(0deg, #0000 10%, #fff1 90%, #0000 100%);
  animation: crtAnimation 300s linear infinite;
  background-size: 100% 80%;
  mask-image: linear-gradient(to bottom, #0005 50%, #000 50%);
  mask-size: 100% 2px;
}

.disabled {
  cursor: not-allowed;
  color: #686868;
  border-color: #686868;
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
