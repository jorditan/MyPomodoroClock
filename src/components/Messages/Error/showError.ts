import { ref } from 'vue';
export const showError = () => {
  const errorVisible = ref<boolean>(false);

  const showMessage = () => {
    errorVisible.value = true;
    console.log('acá muestra');
    console.log(errorVisible.value);
    setTimeout(() => {
      errorVisible.value = false;
    }, 3000);
  };

  return {
    errorVisible,

    showMessage,
  };
};
