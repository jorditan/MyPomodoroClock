<template>
  <section
    aria-label="Pomodoro section"
    class="w-full rounded-xl p-6 mr-5 m-auto bg-[#28282860] h-[95%] my-5 text-center border-double border-4 border-[#1a7c1a]"
  >
    <div class="flex flex-col">
      <h1 class="text-7xl text-[#fafafa]">My pomodoro clock</h1>
      <p class="text-slate-300 text-[20px]">{{ actualStatus }}</p>
    </div>

    <article id="myClock" class="mt-5">
      <h2 class="text-8xl text-[#fafafa]">{{ minutes }}:{{ formattedSeconds }}</h2>

      <div class="flex gap-4 justify-center mt-5 flex-col items-center">
        <button @click="handleStatus" class="buttons w-[220px] aling-center">
          {{ text[actualStatus] }}
        </button>
        <button class="underline text-[#00ff00]">¿Deseas cambiar el tiempo límite?</button>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { Status } from './status';
import { useMyTimer } from './useMyTimer';
const { formattedSeconds, minutes, actualStatus, handleStatus } = useMyTimer();
const text = {
  [Status.counting]: 'PAUSA',
  [Status.waiting]: 'COMENZAR',
  [Status.break]: 'DESPAUSAR',
  [Status.finish]: 'REINICIAR',
};
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

.buttons {
  @apply text-[24px] rounded-sm text-[#000000] bg-[#00ff00] px-6 py-2 backdrop-blur-lg;
}

.buttons {
  box-shadow: 0 0 8px #00ff00;
}
</style>
