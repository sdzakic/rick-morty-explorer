<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchCharacters } from '@/services/api'

import SearchBar from '@/components/SearchBar.vue'
import StatusFilter from '@/components/StatusFilter.vue'
import CharacterGrid from '@/components/CharacterGrid.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const router = useRouter()

const state = reactive({
  characters: [],
  page: 1,
  pages: 1,
  count: 0,
})
const query = ref('')
const status = ref('')
const loading = ref(false)
const searching = ref(false) // true od prvog pritiska tipke do dolaska rezultata
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    const data = await fetchCharacters({
      name: query.value,
      status: status.value,
      page: state.page,
    })
    state.characters = data.results
    state.pages = data.info.pages
    state.count = data.info.count
  } catch (e) {
    // API vraća 404 kad nema rezultata — tretiramo kao "prazno"
    if (e.response?.status === 404) {
      state.characters = []
      state.pages = 1
      state.count = 0
    } else {
      error.value = 'Ne mogu dohvatiti podatke. Provjeri internet vezu.'
    }
  } finally {
    loading.value = false
    searching.value = false
  }
}

// COMPUTED — izvedeni prikazni tekst
const resultSummary = computed(() =>
  state.count > 0 ? `Pronađeno ${state.count} likova` : 'Nema rezultata za zadane filtere',
)
const isEmpty = computed(
  () => !loading.value && !error.value && state.characters.length === 0,
)

// WATCH — promjena pretrage ili filtera vraća na 1. stranicu i ponovo dohvaća
watch([query, status], () => {
  state.page = 1
  load()
})
// WATCH — promjena stranice = novi dohvat + scroll na vrh
watch(
  () => state.page,
  () => {
    load()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)

function goToDetail(id) {
  router.push({ name: 'character', params: { id } })
}

onMounted(load)
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-6">
    <div
      class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <SearchBar
        v-model="query"
        class="md:max-w-md"
        @typing="searching = true"
      />
      <StatusFilter v-model="status" />
    </div>

    <p class="mb-4 flex items-center gap-2 text-sm text-slate-400">
      <span
        v-if="searching"
        class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-600 border-t-portal"
      />
      {{ searching ? 'Pretraživanje…' : resultSummary }}
    </p>

    <LoadingSpinner v-if="loading" />
    <ErrorMessage
      v-else-if="error"
      :message="error"
      @retry="load"
    />
    <p
      v-else-if="isEmpty"
      class="py-16 text-center text-slate-400"
    >
      🛸 Ništa nije pronađeno.
    </p>
    <template v-else>
      <CharacterGrid
        :characters="state.characters"
        @select="goToDetail"
      />
      <Pagination
        :page="state.page"
        :pages="state.pages"
        @change="state.page = $event"
      />
    </template>
  </section>
</template>
