import { onBeforeUnmount } from 'vue';

export const useKeyDown = function (keyCombo) {
  let onKey = function (event) {
    if (event.key === keyCombo.key) {
      keyCombo.fn();
    }
  };
  window.addEventListener('keydown', onKey);
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey);
  });
};

export default useKeyDown;
