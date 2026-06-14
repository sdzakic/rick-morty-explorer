# Rick & Morty Explorer

Projekt iz kolegija **Korisnička sučelja** (FPMOZ). Vue 3 + Vite + Tailwind CSS
aplikacija koja dohvaća i prikazuje likove iz besplatnog javnog API-ja
[Rick and Morty API](https://rickandmortyapi.com/).

## Funkcionalnosti

- 📡 HTTP zahtjevi preko **axios** (lista likova + detalj lika)
- 🔍 Pretraga po imenu i filter po statusu (živ / mrtav / nepoznato)
- 📄 Paginacija rezultata
- 🧩 Više komponenti s **props** i **emits** komunikacijom
- ⚡ `computed` i `watch` za izvedeno stanje i reakciju na promjene
- 📱 Potpuno responzivno (mobitel / tablet / desktop) — Tailwind breakpointi
- 🎨 Stiliziranje isključivo Tailwind CSS-om

## Tehnologije

- Vue 3 (`<script setup>` SFC)
- Vue Router 4
- Vite 6
- Tailwind CSS 3
- axios

## Pokretanje

```bash
npm install
npm run dev      # development server na http://localhost:5173
```

Ostale skripte:

```bash
npm run build    # produkcijski build u dist/
npm run preview  # lokalni pregled builda
npm run lint     # ESLint
npm run format   # Prettier
```

## Struktura

```
src/
├─ main.js                 # bootstrap + import CSS-a
├─ App.vue                 # root layout
├─ router/index.js         # rute
├─ assets/main.css         # Tailwind direktive + globalni stilovi
├─ services/api.js         # axios HTTP sloj
├─ components/             # SearchBar, StatusFilter, CharacterCard,
│                          # CharacterGrid, Pagination, LoadingSpinner,
│                          # ErrorMessage, AppHeader
└─ views/                  # HomeView, CharacterDetailView
```

## Autori

- Slobodan Džakić — slobodan.dzakic@gmail.com
- Marko Zarić — zaricmarko33@gmail.com
