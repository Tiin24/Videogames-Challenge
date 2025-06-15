<script setup>
import { ref, onMounted } from 'vue'
import GameCard from '../components/GameCard.vue'

const favorites = ref([])

function loadFavorites() {
  const favs = localStorage.getItem('favoriteGames')
  favorites.value = favs ? JSON.parse(favs) : []
}

function removeFavorite(id) {
  favorites.value = favorites.value.filter(game => game.id !== id)
  localStorage.setItem('favoriteGames', JSON.stringify(favorites.value))
}

onMounted(() => {
  loadFavorites()
})
</script>

<template>
  <div class="p-12 mx-auto bg-red-950 min-h-screen max-w-6xl">
    <h2 class="text-3xl font-bold text-white mb-6 persona-font uppercase">Mis Juegos Favoritos</h2>
    <div v-if="favorites.length === 0" class="text-gray-300 text-center mt-10">
      No hay juegos favoritos aún.
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <GameCard v-for="game in favorites" :key="game.id" :game="game" :showRemove="true"
        @remove="removeFavorite(game.id)" />
    </div>
  </div>
</template>
