<script setup>
defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue'])

const options = [
  { label: 'Svi', value: '' },
  { label: 'Živ', value: 'alive' },
  { label: 'Mrtav', value: 'dead' },
  { label: 'Nepoznato', value: 'unknown' },
]
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="opt in options"
      :key="opt.value"
      class="btn-ghost text-sm"
      :class="{ 'bg-portal text-space border-portal': modelValue === opt.value }"
      @click="emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>
