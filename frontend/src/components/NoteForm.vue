<template>
  <div class="note-form">
    <h2>{{ editNote ? "Edit Note" : "Add Note" }}</h2>
    <form @submit.prevent="submitNote">
      <input v-model="title" placeholder="Title" required />
      <textarea v-model="content" placeholder="Content" required></textarea>
      <button type="submit">{{ editNote ? "Update" : "Add" }}</button>
      <button v-if="editNote" @click.prevent="cancelEdit">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    editNote: Object,
  },
  data() {
    return {
      title: this.editNote?.title || "",
      content: this.editNote?.content || "",
    };
  },
  watch: {
    editNote(newVal) {
      this.title = newVal?.title || "";
      this.content = newVal?.content || "";
    },
  },
  methods: {
    submitNote() {
      this.$emit("submit-note", {
        id: this.editNote?.id,
        title: this.title,
        content: this.content,
      });
      this.title = "";
      this.content = "";
    },
    cancelEdit() {
      this.$emit("cancel-edit");
    },
  },
};
</script>

<style scoped>
.note-form {
  margin-bottom: 1rem;
}
input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
}
button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
}
</style>
