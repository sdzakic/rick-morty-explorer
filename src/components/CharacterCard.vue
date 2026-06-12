<script setup>
defineProps({
  character: { type: Object, required: true },
})
const emit = defineEmits(['select'])

const statusColor = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-slate-500',
}
</script>

<template>
  <article
    class="group cursor-pointer overflow-hidden rounded-xl bg-slate-800
           ring-1 ring-slate-700 transition hover:ring-portal hover:-translate-y-1"
    @click="emit('select', character.id)"
  >
    <img
      :src="character.image"
      :alt="character.name"
      loading="lazy"
      class="h-48 w-full object-cover transition group-hover:scale-105"
    >
    <div class="p-4">
      <h3 class="truncate text-lg font-bold">
        {{ character.name }}
      </h3>
      <p class="flex items-center gap-2 text-sm text-slate-300">
        <span
          class="h-2.5 w-2.5 rounded-full"
          :class="statusColor[character.status] || 'bg-slate-500'"
        />
        {{ character.status }} — {{ character.species }}
      </p>
      <p class="mt-1 truncate text-xs text-slate-400">
        📍 {{ character.location.name }}
      </p>
    </div>
  </article>
</template>
