<script setup>
import CharacterCard from './CharacterCard.vue'

defineProps({
  characters: { type: Array, required: true },
})
const emit = defineEmits(['select'])
</script>

<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <CharacterCard
      v-for="c in characters"
      :key="c.id"
      :character="c"
      @select="emit('select', $event)"
    />
  </div>
</template>
