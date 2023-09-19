<template>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in unarchivedEmails"
        :key="email.id"
        class="clickable"
        :class="{ read: email.read }"
        @click="openEmail(email)"
      >
        <td>
          <input type="checkbox" />
        </td>
        <td>
          {{ email.from }}
        </td>
        <td>
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td class="date">
          {{ format(new Date(email.sentAt), 'MMM do yyyy') }}
        </td>
        <td>
          <button @click.stop="archiveEmail(email)">Archived</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="openedEmail">
    <ModalView @close-modal="openedEmail = null">
      <MailView :email="openedEmail" @change-email="changeEmail" />
    </ModalView>
  </div>
</template>

<script>
import { format } from 'date-fns';
import axios from 'axios';
import { ref } from 'vue';
import MailView from './MailView.vue';
import ModalView from './ModalView.vue';

export default {
  name: 'App',
  components: {
    MailView,
    ModalView,
  },
  async setup() {
    let response = await axios.get('http://localhost:3000/emails');
    let emails = ref(response.data);
    let openedEmail = ref(null);
    return {
      format,
      emails,
      openedEmail,
    };
  },
  computed: {
    sortedEmails() {
      return [...this.emails].sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 0 : 1;
      });
    },
    unarchivedEmails() {
      return this.sortedEmails.filter((email) => email.archived === false);
    },
  },
  methods: {
    openEmail(email) {
      email.read = true;
      this.updateEmail(email);
      this.openedEmail = email;
    },
    archiveEmail(email) {
      email.archived = true;
      this.updateEmail(email);
    },
    changeEmail({ toggleRead, toggleArchive, save, closeModal, changeIndex }) {
      let email = this.openedEmail;
      if (toggleRead) {
        email.read = !email.read;
      }
      if (toggleArchive) {
        email.archived = !email.archived;
      }
      if (save) {
        this.updateEmail(email);
      }
      if (closeModal) {
        this.openedEmail = null;
      }
      if (changeIndex) {
        let emails = this.unarchivedEmails;
        let currentIndex = emails.indexOf(this.openedEmail);
        let newEmail = emails[currentIndex + changeIndex];
        this.openEmail(newEmail);
      }
    },
    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    },
  },
};
</script>
