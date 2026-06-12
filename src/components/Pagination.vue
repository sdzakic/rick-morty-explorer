<script setup>
defineProps({
  page: { type: Number, required: true },
  pages: { type: Number, required: true },
})
const emit = defineEmits(['change'])
</script>

<template>
  <div class="flex items-center justify-center gap-4 py-6">
    <button
      class="btn-ghost"
      :disabled="page <= 1"
      @click="emit('change', page - 1)"
    >
      ← Prethodna
    </button>
    <span class="text-sm text-slate-300">Stranica {{ page }} / {{ pages }}</span>
    <button
      class="btn-ghost"
      :disabled="page >= pages"
      @click="emit('change', page + 1)"
    >
      Sljedeća →
    </button>
  </div>
</template>
