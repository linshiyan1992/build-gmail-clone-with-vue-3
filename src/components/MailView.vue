<script>
import format from 'date-fns/format';
import marked from 'marked';
import useKeyDown from '../composables/useKeyDown';

export default {
  props: {
    email: {
      type: Object,
      required: true,
    },
  },
  emits: ['changeEmail'],
  setup(props, { emit }) {
    let toggleRead = () =>
      emit('changeEmail', { toggleRead: true, save: true });
    let toggleArchive = () =>
      emit('changeEmail', {
        toggleArchive: true,
        save: true,
        closeModal: true,
      });
    let goNewer = () => emit('changeEmail', { changeIndex: -1 });
    let goOlder = () => emit('changeEmail', { changeIndex: 1 });
    let goNewerAndArchive = () =>
      emit('changeEmail', { changeIndex: -1, toggleArchive: true });
    let goOlderAndArchive = () =>
      emit('changeEmail', { changeIndex: 1, toggleArchive: true });

    useKeyDown({
      key: 'r',
      fn: toggleRead,
    });
    useKeyDown({
      key: 'e',
      fn: toggleArchive,
    });
    useKeyDown({
      key: 'j',
      fn: goOlder,
    });
    useKeyDown({
      key: 'k',
      fn: goNewer,
    });
    useKeyDown({
      key: '[',
      fn: goNewerAndArchive,
    });
    useKeyDown({
      key: ']',
      fn: goOlderAndArchive,
    });

    return {
      format,
      marked,
      toggleArchive,
      toggleRead,
      goNewer,
      goOlder,
      goNewerAndArchive,
      goOlderAndArchive,
    };
  },
};
</script>

<template>
  <div class="email-display">
    <div class="toolbar">
      <button @click="toggleArchive">
        {{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}
      </button>
      <button @click="toggleRead">
        {{ email.read ? 'Mark as unread (r)' : 'Mark as read (r)' }}
      </button>
      <button @click="goNewer">Newer (j)</button>
      <button @click="goOlder">Older (k)</button>
    </div>
  </div>
  <div class="email-display">
    <h2 class="mb-0">
      Subject: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em>
        From {{ email.from }} on
        {{ format(new Date(email.sentAt), 'MMM do yyyy') }}
      </em>
    </div>
    // eslint-disable-next-line vue/no-v-html
    <div v-html="marked(email.body)" />
  </div>
</template>

<style></style>
