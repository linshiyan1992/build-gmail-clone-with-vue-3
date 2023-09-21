import { ref } from 'vue';
import axios from 'axios';

let emailSet = new Set();

const useEmailSelection = function () {
  let selected = ref(emailSet);
  let toggle = function (email) {
    if (this.selected.value.has(email)) this.selected.value.delete(email);
    else this.selected.value.add(email);
  };
  let clear = function () {
    selected.value.clear();
  };
  let addMultiple = function (emails) {
    for (let email of emails) selected.value.add(email);
  };
  let size = function () {
    return selected.value.size;
  };

  let updateEmail = function (email) {
    axios.put(`http://localhost:3000/emails/${email.id}`, email);
  };

  let forSelected = function (fn) {
    for (let email of selected.value) {
      fn(email);
      updateEmail(email);
    }
  };

  let markRead = () => forSelected((email) => (email.read = true));
  let markUnread = () => forSelected((email) => (email.read = false));
  let archive = () => {
    forSelected((email) => (email.archived = true));
    clear();
    console.log(selected.value);
  };

  return {
    selected,
    toggle,
    clear,
    addMultiple,
    size,
    markRead,
    markUnread,
    archive,
  };
};

export default useEmailSelection;
