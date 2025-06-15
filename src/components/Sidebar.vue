<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const FAVORITES_KEY = 'favoriteGames'
const favoriteCount = ref(0)

const baseMenu = [
  { label: 'Inicio', to: '/', icon: '🏠' },
  { label: 'Populares', to: '/populares', icon: '🔥' },
  { label: 'Categorías', to: '/categorias', icon: '🕹️' },
  { label: 'Ajustes', to: '/ajustes', icon: '⚙️' },
]

const loadFavoriteCount = () => {
  const favs = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
  favoriteCount.value = favs.length
}

const onFavoritesChanged = () => {
  loadFavoriteCount()
}

onMounted(() => {
  loadFavoriteCount()
  window.addEventListener('favorites-changed', onFavoritesChanged)
})

onBeforeUnmount(() => {
  window.removeEventListener('favorites-changed', onFavoritesChanged)
})

// Menú completo con favoritos dinámico
const menu = computed(() => [
  ...baseMenu,
  { label: `Favoritos (${favoriteCount.value})`, to: '/favoritos', icon: '⭐' },
])
</script>

<template>
  <aside class="w-64 bg-red-950 shadow-[8px_0_0_0_black] flex flex-col h-screen fixed top-0 left-0 z-50">
    <div class=" border-b border-black">
      <h1 class="persona-title w-full text-white text-center">
        Taxes Games
      </h1>

    </div>
    <nav class="flex-1 px-4 py-6 space-y-4">
      <RouterLink v-for="item in menu" :key="item.label" :to="item.to"
        class="block text-lg persona-font px-4 py-2 rounded transition-all duration-200 hover:bg-red-800 hover:translate-x-1 hover:shadow-[4px_4px_0_0_black]">
        {{ item.icon }} {{ item.label }}
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.persona-font {
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.persona-title {
  font-family: 'EarwigFactory', sans-serif;
  letter-spacing: 0.03em;
  font-size: 2.5rem;
  text-shadow:
    -2px -2px 0 #000,
    2px -2px 0 #000,
    -2px 2px 0 #000,
    2px 2px 0 #000;
}
</style>
