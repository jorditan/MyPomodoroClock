import { ref } from 'vue';
export const showError = () => {
  const errorVisible = ref<boolean>(false);

  const showMessage = async (message?: string) => {
    errorVisible.value = true;
    setTimeout(() => {
      errorVisible.value = false;
    }, 3000);
    return {
      message,
    };
  };
  return {
    errorVisible,

    showMessage,
  };
};
