<template>
  <div class="container py-5">
    <header class="d-flex align-items-center justify-content-between px-4 py-3 mb-4">
      <h1 class="text-white mb-0 fs-3 fw-bold">NoteFlow</h1>
      <button @click="createNewNote" class="btn btn-light btn-lg px-5">
        + New Note
      </button>
    </header>

    <!-- Edit / Add Form (Rich-Text) -->
    <div v-if="editNote !== null" class="glass-card mb-5">
      <h3 class="text-white mb-3">{{ editNote.id ? 'Edit Note' : 'Create Note' }}</h3>

      <!-- Title -->
      <input
        v-model="form.title"
        placeholder="Title"
        class="form-control mb-3"
        required
      />

      <!-- Toolbar -->
      <div class="editor-toolbar mb-2">
        <button type="button" class="editor-btn" @click="format('bold')" title="Bold"><b>B</b></button>
        <button type="button" class="editor-btn" @click="format('italic')" title="Italic"><i>I</i></button>
        <button type="button" class="editor-btn" @click="format('underline')" title="Underline"><u>U</u></button>
        <div class="toolbar-divider"></div>

        <button type="button" class="editor-btn" @click="format('insertUnorderedList')" title="Bullet list"><img src="../icon/bullet-list.png" alt="Bullet list" style="width: 20px; height: 20px;"/></button>
        <button type="button" class="editor-btn" @click="format('insertOrderedList')" title="Numbered list"><img src="../icon/numbered-list.png" alt="Numbered list" style="width: 20px; height: 20px;"/></button>
        <div class="toolbar-divider"></div>
        <button type="button" class="editor-btn" @click="format('justifyLeft')" title="Left align"><img src="../icon/left-align.png" alt="Left align" style="width: 20px; height: 20px;"/></button>
        <button type="button" class="editor-btn" @click="format('justifyCenter')" title="Center align"><img src="../icon/center-align.png" alt="Center align" style="width: 20px; height: 20px;"/></button>
        <button type="button" class="editor-btn" @click="format('justifyRight')" title="Right align"><img src="../icon/right-align.png" alt="Right align" style="width: 20px; height: 20px;"/></button>
      </div>

      <!-- Editable content -->
      <div
        ref="contentEditor"
        class="editor-content"
        contenteditable="true"
        @input="onEditorInput"
        :data-placeholder="editNote && !editNote.id ? 'Start typing...' : ''"
      ></div>

      <!-- Save / Cancel -->
      <div class="mt-3">
        <button type="button" class="btn btn-primary me-2" @click="submitNote">
          {{ editNote.id ? 'Update' : 'Save' }}
        </button>
        <button type="button" class="btn btn-secondary" @click="editNote = null">
          Cancel
        </button>
      </div>
    </div>

    <!-- Notes List -->
    <NotesList
      :notes="notes"
      @edit-note="startEdit"
      @delete-note="deleteNote"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import axios from 'axios';
import NotesList from './components/NotesList.vue';

// ---------- Refs ----------
const notes = ref([]);
const editNote = ref(null);
const selectedNote = ref(null);
const form = ref({ title: '', content: '' });
const contentEditor = ref(null);
const imageInput = ref(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ---------- Lifecycle ----------
onMounted(fetchNotes);

// ---------- API ----------
async function fetchNotes() {
  try {
    const { data } = await axios.get(`${API_URL}/notes`);
    notes.value = data;
  } catch (err) {
    console.error('Failed to fetch notes:', err.message);
  }
}

// ---------- Toolbar ----------
function format(command) {
  document.execCommand(command, false, null);
  contentEditor.value?.focus();
}

// ---------- Editor Sync ----------
function onEditorInput() {
  form.value.content = contentEditor.value?.innerHTML ?? '';
}

watch(editNote, async (note) => {
  if (!note) return;
  form.value.title = note.title ?? '';
  await nextTick();
  if (contentEditor.value) {
    contentEditor.value.innerHTML = note.content ?? '';
  }
}, { immediate: true });

// ---------- CRUD ----------
function createNewNote() {
  editNote.value = {};
  form.value = { title: '', content: '' };
  nextTick(() => contentEditor.value?.focus());
}

function startEdit(note) {
  editNote.value = { ...note };
  selectedNote.value = note;
}

async function submitNote() {
  const payload = {
    title: form.value.title.trim(),
    content: form.value.content,
  };

  try {
    let saved;
    if (editNote.value.id) {
      const { data } = await axios.put(`${API_URL}/notes/${editNote.value.id}`, payload);
      saved = data;
    } else {
      const { data } = await axios.post(`${API_URL}/notes`, payload);
      saved = data;
    }

    editNote.value = null;
    form.value = { title: '', content: '' };
    await fetchNotes();
    selectedNote.value = notes.value.find(n => n.id === saved.id) ?? null;
  } catch (err) {
    console.error('Save failed:', err);
    alert('Failed to save note');
  }
}

async function deleteNote(id) {
  if (!confirm('Delete this note?')) return;
  await axios.delete(`${API_URL}/notes/${id}`);
  await fetchNotes();
  if (selectedNote.value?.id === id) selectedNote.value = null;
}
</script>