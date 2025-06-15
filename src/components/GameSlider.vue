<script setup>
import { onMounted, ref } from 'vue'
import { getPopularGames } from '@/services/gameService'

const popularGames = ref([])

onMounted(async () => {
  const res = await getPopularGames()
  popularGames.value = res.results
})
</script>

<template>
  <div class="overflow-x-auto no-scrollbar">
    <div class="flex space-x-4 pb-4">
      <div v-for="game in popularGames" :key="game.id"
        class="min-w-[250px] bg-blue-800 rounded-xl overflow-hidden shadow hover:shadow-md transition">
        <img :src="game.background_image" :alt="game.name" class="h-40 w-full object-cover" />
        <div class="p-2">
          <h3 class="text-white text-md font-semibold truncate">{{ game.name }}</h3>
          <p class="text-gray-300 text-sm">Rating: {{ game.rating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
