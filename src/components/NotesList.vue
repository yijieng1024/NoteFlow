<template>
  <div class="row g-4">
    <div v-for="note in notes" :key="note.id" class="col-md-6 col-lg-4">
      <div class="glass-card position-relative">
        <h5 class="text-white mb-2">{{ note.title }}</h5>

        <div class="divider"></div>
        <p class="text-white mb-0" v-html="note.content"></p>

        <!-- menu -->
        <div class="dropdown position-absolute" style="top: 16px; right: 16px;">
          <button class="dropdown-toggle" data-bs-toggle="dropdown"
            style="background: none; border: none; color: white; font-size: 16px; padding: 0;">
            <i class="bi bi-three-dots-vertical"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><button class="dropdown-item" @click="$emit('edit-note', note)">Edit</button></li>
            <li><button class="dropdown-item text-danger" @click="$emit('delete-note', note.id)">Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['notes']);
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
</script>