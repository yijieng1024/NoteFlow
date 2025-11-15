<template>
  <div class="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30">
    <h2 class="text-2xl font-bold text-white mb-4">
      {{ editNote.id ? 'Edit Note' : 'Create Note' }}
    </h2>
    <form @submit.prevent="submit">
      <input
        v-model="title"
        placeholder="Title"
        required
        class="w-full p-3 rounded-lg mb-3 bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <textarea
        v-model="content"
        placeholder="Content"
        required
        rows="4"
        class="w-full p-3 rounded-lg mb-4 bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-white"
      ></textarea>
      <div class="flex gap-2">
        <button
          type="submit"
          class="bg-green-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-600 transition"
        >
          {{ editNote.id ? 'Update' : 'Save' }}
        </button>
        <button
          type="button"
          @click="$emit('cancel')"
          class="bg-gray-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['editNote']);
const emit = defineEmits(['submit-note', 'cancel']);

const title = ref('');
const content = ref('');

watch(() => props.editNote, (val) => {
  title.value = val?.title || '';
  content.value = val?.content || '';
}, { immediate: true });

const submit = () => {
  emit('submit-note', {
    id: props.editNote?.id,
    title: title.value,
    content: content.value,
  });
  title.value = '';
  content.value = '';
};
</script>