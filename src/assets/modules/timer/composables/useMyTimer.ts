import { computed, nextTick, ref } from 'vue';
import { Status } from '../../../interfaces/status';
import { showError } from '@/components/Messages/Error/showError';
import notification from '@/assets/songs/notificacion.mp3';

export const useMyTimer = () => {
  const { showMessage, errorVisible } = showError();
  const actualStatus = ref<Status>(Status.waiting);

  // Variables utilizadas para el total de rondas realizadas el comienzo 👇

  const totalRounds = ref<number>(0);
  const totalBreaks = ref<number>(0);

  // Variables utilizadas para setear el comienzo 👇

  const seconds = ref<number>(0);
  const minutes = ref<number>(25);
  const breakMinutes = ref<number>(5);

  // Variables utlizadas para medir el porcentaje de realizado 👇

  const totalBreakMinutes = ref<number>(5);
  const total = ref<number>(25);

  // Variables utilizadas para lo transcurrido 👇

  const transcorredMinutes = ref<number>(0);

  // Variables utilizadas para el resumen 👇

  const resumeMinutes = ref<number>(0);
  const resumeBreak = ref<number>(0);

  const formattedMinutes = computed(() => {
    return minutes.value.toString().padStart(2, '0');
  });
  const formattedSeconds = computed(() => {
    return seconds.value.toString().padStart(2, '0');
  });

  let intervalId: number | null = null;

  const handleStatus = (): void => {
    if (actualStatus.value == Status.waiting) {
      actualStatus.value = Status.counting;
      passTime();
    } else if (actualStatus.value == Status.counting) {
      actualStatus.value = Status.break;
      stopCounting();
    } else if (actualStatus.value == Status.break) {
      passTime();
      actualStatus.value = Status.counting;
    } else if (actualStatus.value == Status.finish) {
      actualStatus.value = Status.resting;
      passTimeBreak();
    } else if (actualStatus.value == Status.resting) {
      stopCounting();
      actualStatus.value = Status.breakRest;
    } else if (actualStatus.value == Status.breakRest) {
      actualStatus.value = Status.resting;
      passTimeBreak();
    }
  };

  const passTime = (): void => {
    intervalId = setInterval(() => {
      if (minutes.value == 0 && seconds.value == 0) {
        finishCounting();
      } else if (seconds.value === 0) {
        if (minutes.value > 0) {
          seconds.value = 59;
          minutes.value--;
          transcorredMinutes.value++;
        }
      } else {
        seconds.value--;
      }
      updateTitle();
    }, 10);
  };

  const passTimeBreak = (): void => {
    intervalId = setInterval(() => {
      if (breakMinutes.value == 0 && seconds.value == 0) {
        finisBreak();
      } else if (seconds.value === 0) {
        if (breakMinutes.value > 0) {
          seconds.value = 59;
          breakMinutes.value--;
        }
      } else {
        seconds.value--;
      }
      updateTitle();
    }, 10);
  };

  const finishCounting = (): void => {
    stopCounting();
    const audio = new Audio(notification);
    audio.volume = 0.5;
    audio.play();
    minutes.value = total.value;
    totalRounds.value++;
    actualStatus.value = Status.finish;
    transcorredMinutes.value = 0;
    resumeMinutes.value += minutes.value;
  };

  const finisBreak = (): void => {
    stopCounting();
    breakMinutes.value = totalBreakMinutes.value;
    totalBreaks.value++;
    actualStatus.value = Status.waiting;
    resumeBreak.value += breakMinutes.value;
  };

  const updateTitle = (): void => {
    document.title = `${formattedMinutes.value}:${formattedSeconds.value} - ${actualStatus.value}`;
  };

  const stopCounting = (): void => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const defineLimit = async (number: number | undefined): Promise<void> => {
    if (number != undefined) {
      if (number <= 0) {
        showMessage();
      } else if (number <= 60) {
        errorVisible.value = false;
        await nextTick();
        minutes.value = number;
        total.value = number;
      } else {
        showMessage();
      }
    }
  };

  const defineBreak = async (aNumber: number | undefined): Promise<void> => {
    if (aNumber != undefined) {
      if (aNumber <= 0) {
        showMessage();
      } else if (aNumber <= 60) {
        errorVisible.value = false;
        await nextTick();
        breakMinutes.value = aNumber;
      } else {
        showMessage();
      }
    }
  };

  return {
    breakMinutes,
    formattedSeconds,
    formattedMinutes,
    actualStatus,
    totalRounds,
    totalBreaks,
    transcorredMinutes,

    errorVisible,
    minutes,
    resumeMinutes,
    resumeBreak,
    total,

    handleStatus,
    finishCounting,
    defineLimit,
    defineBreak,
  };
};
