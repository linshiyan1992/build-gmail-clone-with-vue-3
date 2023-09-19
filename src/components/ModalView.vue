<script>
import { onBeforeUnmount } from 'vue';
import useKeyDown from '../composables/useKeyDown';

export default {
  emits: ['closeModal'],
  setup(props, { emit }) {
    useKeyDown({ key: 'Escape', fn: () => emit('closeModal') });
    return {
      emit,
    };
  },
};
</script>

<template>
  <div class="modal">
    <div class="overlay" @click="emit('closeModal')"></div>
    <div class="modal-card">
      <slot></slot>
    </div>
  </div>
</template>
