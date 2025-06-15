<script setup>
import Carrousel from '@/components/Carrousel.vue'
import GameCard from '@/components/GameCard.vue'
import { useGamesStore } from '@/store/useGameStore' // fijate bien el nombre y path
import { onMounted, onBeforeUnmount, computed, toRefs } from 'vue'

const gamesStore = useGamesStore()

const { games, popularGames, hasMore, loading } = toRefs(gamesStore)

const onScroll = () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
  if (nearBottom && hasMore.value && !loading.value) gamesStore.fetchGames()
}

onMounted(() => {
  gamesStore.fetchGames()
  gamesStore.fetchPopularGames()
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const topGames = computed(() => {
  // popularGames.value es un ref, siempre usar .value
  return [...popularGames.value].sort((a, b) => b.rating - a.rating).slice(0, 5)
})
</script>

<template>
  <div class="p-6 min-h-screen bg-red-950">
    <section class="mb-16">
      <h1 class="text-3xl persona-title persona-font text-white mb-6">Top</h1>
      <Carrousel v-if="topGames.length" :games="topGames" />
      <div v-else class="text-white">Cargando juegos populares...</div>
    </section>

    <section>
      <h1 class="persona-title text-3xl text-white mb-6">All Games</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <GameCard v-for="game in games" :key="game.id" :game="game" />
      </div>
    </section>

    <div v-if="loading" class="text-center text-white mt-4">Cargando más juegos...</div>
    <div v-if="!hasMore && !loading" class="text-center text-gray-400 mt-4">No hay más juegos</div>
  </div>
</template>

<style>
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
