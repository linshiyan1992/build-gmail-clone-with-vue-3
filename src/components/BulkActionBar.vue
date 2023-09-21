<script setup>
import useEmailSelection from '../composables/useEmailSelection';
import { computed } from 'vue';

let props = defineProps({
  unArchivedEmails: {
    required: true,
    type: Array,
  },
});

let emailSelection = useEmailSelection();
let numberSelected = computed(() => emailSelection.size());
let numberEmails = computed(() => props.unArchivedEmails.length);
let allEmailSelected = computed(
  () => numberSelected.value === numberEmails.value,
);
let partialSelection = computed(() => {
  return numberSelected.value > 0 && numberSelected.value < numberEmails.value;
});

let bulkSelect = function () {
  if (allEmailSelected.value) emailSelection.clear();
  else emailSelection.addMultiple(props.unArchivedEmails);
};
</script>

<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allEmailSelected"
        :class="partialSelection ? 'partial-check' : ''"
        @click="bulkSelect"
      />
    </span>
    <span class="buttons">
      <button
        :disabled="
          Array.from(emailSelection.selected.value).every((e) => e.read)
        "
        @click="emailSelection.markRead()"
      >
        Mark Read
      </button>
      <button
        :disabled="
          Array.from(emailSelection.selected.value).every((e) => !e.read)
        "
        @click="emailSelection.markUnread()"
      >
        Mark Unread
      </button>
      <button
        :disabled="numberSelected === 0"
        @click="emailSelection.archive()"
      >
        Mark Archive
      </button>
    </span>
  </div>
</template>
