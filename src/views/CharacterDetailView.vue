<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchCharacterById } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const route = useRoute()
const router = useRouter()
const character = ref(null)
const loading = ref(false)
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    character.value = await fetchCharacterById(route.params.id)
  } catch {
    error.value = 'Lik nije pronađen.'
  } finally {
    loading.value = false
  }
}

// WATCH — ako korisnik navigira između detalja, ponovo dohvati
watch(() => route.params.id, load)
onMounted(load)
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 py-8">
    <button
      class="btn-ghost mb-6"
      @click="router.back()"
    >
      ← Natrag
    </button>

    <LoadingSpinner v-if="loading" />
    <ErrorMessage
      v-else-if="error"
      :message="error"
      @retry="load"
    />
    <div
      v-else-if="character"
      class="flex flex-col gap-6 sm:flex-row"
    >
      <img
        :src="character.image"
        :alt="character.name"
        class="w-full rounded-xl sm:w-64"
      >
      <div class="space-y-2">
        <h1 class="text-3xl font-bold">
          {{ character.name }}
        </h1>
        <p><span class="text-slate-400">Status:</span> {{ character.status }}</p>
        <p><span class="text-slate-400">Vrsta:</span> {{ character.species }}</p>
        <p><span class="text-slate-400">Spol:</span> {{ character.gender }}</p>
        <p><span class="text-slate-400">Porijeklo:</span> {{ character.origin.name }}</p>
        <p><span class="text-slate-400">Lokacija:</span> {{ character.location.name }}</p>
        <p>
          <span class="text-slate-400">Broj epizoda:</span>
          {{ character.episode.length }}
        </p>
      </div>
    </div>
  </section>
</template>
