import { computed, ref } from 'vue';
import { Status } from './status';
import { showError } from '@/components/Messages/Error/showError'; // Asegúrate de que la ruta sea correcta

export const useMyTimer = () => {
  const { showMessage, errorVisible } = showError();
  const totalRounds = ref<number>(0);
  const seconds = ref<number>(0);
  const minutes = ref<number>(25);
  const transcorredMinutes = ref<number>(0);
  const actualStatus = ref<Status>(Status.waiting);
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
      restSeconds();
    } else if (actualStatus.value == Status.counting) {
      actualStatus.value = Status.break;
      stopCounting();
    } else if (actualStatus.value == Status.break) {
      restSeconds();
      actualStatus.value = Status.counting;
    }
  };

  const restSeconds = (): void => {
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

  const finishCounting = (): void => {
    stopCounting();
    totalRounds.value++;
    actualStatus.value = Status.finish;
  };

  const updateTitle = () => {
    document.title = `${formattedMinutes.value}:${formattedSeconds.value}`;
  };

  const stopCounting = (): void => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const defineLimit = async (number: number | undefined): Promise<void> => {
    if (number != undefined) {
      if (number <= 60) {
        minutes.value = number;
      } else {
        showMessage();
      }
    }
  };

  return {
    formattedSeconds,
    formattedMinutes,
    actualStatus,
    totalRounds,
    transcorredMinutes,
    errorVisible,

    handleStatus,
    restSeconds,
    finishCounting,
    defineLimit,
  };
};
