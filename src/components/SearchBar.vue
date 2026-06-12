<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Pretraži likove…' },
  debounce: { type: Number, default: 400 }, // ms pauze prije slanja
})
const emit = defineEmits(['update:modelValue', 'search', 'typing'])

const local = ref(props.modelValue)
let timer = null

// drži lokalno stanje u sinkronizaciji s roditeljem
watch(
  () => props.modelValue,
  (v) => {
    local.value = v
  },
)

// emitiraj tek nakon što korisnik prestane tipkati (debounce)
function onInput(e) {
  local.value = e.target.value
  emit('typing') // odmah signaliziraj roditelju da je pretraga u tijeku
  clearTimeout(timer)
  timer = setTimeout(() => {
    emit('update:modelValue', local.value)
    emit('search', local.value.trim())
  }, props.debounce)
}

// Enter / klik na gumb = trenutno slanje (poništi pending debounce)
function submit() {
  clearTimeout(timer)
  emit('update:modelValue', local.value)
  emit('search', local.value.trim())
}

// spriječi emit nakon što je komponenta uništena
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <form
    class="flex w-full gap-2"
    @submit.prevent="submit"
  >
    <input
      :value="local"
      :placeholder="placeholder"
      type="text"
      class="flex-1 rounded-lg bg-slate-800 px-4 py-2 outline-none
             ring-1 ring-slate-700 focus:ring-2 focus:ring-portal"
      @input="onInput"
    >
    <button
      type="submit"
      class="btn-primary"
    >
      Traži
    </button>
  </form>
</template>
