<script setup>
defineProps({ message: { type: String, default: 'Nešto je pošlo po zlu.' } })
const emit = defineEmits(['retry'])
</script>

<template>
  <div class="mx-auto max-w-md rounded-xl bg-red-950/50 p-6 text-center ring-1 ring-red-800">
    <p class="mb-4 text-red-200">
      {{ message }}
    </p>
    <button
      class="btn-primary"
      @click="emit('retry')"
    >
      Pokušaj ponovno
    </button>
  </div>
</template>
