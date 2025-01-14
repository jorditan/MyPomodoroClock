import { computed, ref } from 'vue';
import { Status } from './status';

export const useMyTimer = () => {
  const actualStatus = ref<Status>(Status.waiting);
  const seconds = ref<number>(0);
  const formattedSeconds = computed(() => {
    return seconds.value.toString().padStart(2, '0');
  });
  const minutes = ref<number>(25);
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
      if (seconds.value == 0 && minutes.value != 0) {
        seconds.value = 60;
        minutes.value -= 1;
      }
      seconds.value -= 1;
      updateTitle();
    }, 1000);
  };

  const finishCounting = (): void => {
    if (minutes.value == 0 && seconds.value == 0) {
    }
  };

  const updateTitle = () => {
    document.title = `${minutes.value}:${seconds.value}`;
  };

  const stopCounting = (): void => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  return {
    formattedSeconds,
    minutes,
    actualStatus,

    handleStatus,
    restSeconds,
    finishCounting,
  };
};
