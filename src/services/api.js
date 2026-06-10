import axios from 'axios'

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000,
})

// Lista likova s filterima (name, status) i paginacijom (page)
export async function fetchCharacters({ name = '', status = '', page = 1 } = {}) {
  const { data } = await api.get('/character', { params: { name, status, page } })
  return data // { info: { pages, count, next, prev }, results: [...] }
}

// Detalj jednog lika po ID-u
export async function fetchCharacterById(id) {
  const { data } = await api.get(`/character/${id}`)
  return data
}
