import { ref } from 'vue';
export const showError = () => {
  const errorVisible = ref<boolean>(false);

  const showMessage = (): void => {
    errorVisible.value = true;
    setTimeout(() => {
      errorVisible.value = false;
    }, 3000);
  };
  return {
    errorVisible,

    showMessage,
  };
};
