<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDetailGameStore } from '@/store/useDetailGameStore'
import ImagePreview from '@/components/ImagePreview.vue'
import { ref } from 'vue'

const route = useRoute()
const gameId = route.params.id

const gameStore = useDetailGameStore()

const showFullDescription = ref(false)

const shortDescription = computed(() => {
  if (!gameStore.game?.description) return ''
  const plainText = gameStore.game.description.replace(/<[^>]+>/g, '')
  return plainText.slice(0, 300) + '...'
})

onMounted(() => {
  gameStore.fetchGameDetail(gameId)
})
onUnmounted(() => {
  gameStore.clear()
})

const previewImage = ref(null)

function openPreview(src) {
  previewImage.value = src
}

function closePreview() {
  previewImage.value = null
}

const platformIcons = {
  'PC': 'fa-windows',
  'PlayStation': 'fa-playstation',
  'PlayStation 5': 'fa-playstation',
  'PlayStation 4': 'fa-playstation',
  'Xbox': 'fa-xbox',
  'Xbox Series S/X': 'fa-xbox',
  'Xbox One': 'fa-xbox',
  'Nintendo Switch': 'bi-nintendo-switch',
  'iOS': 'fa-apple',
  'macOS': 'fa-apple',
  'Linux': 'fa-linux',
  'Android': 'fa-android',
  'Web': 'fa-globe',
  'PS Vita': 'si-playstationvita',
}

function getPlatformIcon(platformName) {
  const match = Object.entries(platformIcons).find(([name]) =>
    platformName.toLowerCase().includes(name.toLowerCase())
  )
  return match ? match[1] : null
}

</script>

<template>
  <section v-if="gameStore.loading" class="p-6 text-white text-center">Cargando detalles...</section>

  <section v-else-if="gameStore.error" class="p-6 text-red-500 text-center">{{ gameStore.error }}</section>

  <section v-else-if="gameStore.game" class="p-6 bg-red-950 text-white rounded-lg shadow-lg">
    <h1 class="persona-title w-full text-white text-center">
      {{ gameStore.game.name }}
    </h1>
    <div class="mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <img v-for="shot in gameStore.screenshots" :key="shot.id" :src="shot.image"
          :alt="`Screenshot of ${gameStore.game.name}`"
          class="w-full h-48 object-cover rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform"
          @click="openPreview(shot.image)" />
      </div>
    </div>

    <ImagePreview :src="previewImage" @close="closePreview" />

    <div class="mb-4">
      <h2 class="text-xl persona-font mb-1">Plataformas</h2>
      <ul class="flex flex-wrap gap-3">
        <li v-for="p in gameStore.game.platforms" :key="p.platform.id"
          class="bg-red-800 px-3 py-1 rounded-full text-sm font-semibold shadow flex items-center gap-2">
          <v-icon v-if="getPlatformIcon(p.platform.name)" :name="getPlatformIcon(p.platform.name)"
            class="text-white w-5 h-5" />
          <span class="sr-only">{{ p.platform.name }}</span>
        </li>
      </ul>
    </div>

    <div class="mb-4">
      <h2 class="text-xl persona-font mb-1">Géneros</h2>
      <ul class="flex flex-wrap gap-3">
        <li v-for="g in gameStore.game.genres" :key="g.id"
          class="bg-red-800 px-3 py-1 rounded-full text-sm font-semibold shadow">
          {{ g.name }}
        </li>
      </ul>
    </div>

    <div class="mb-6 flex items-center">
      <h2 class="text-xl persona-font mr-3">Rating:</h2>
      <div class="flex items-center text-yellow-400 text-lg">
        <span v-for="n in 5" :key="n" class="drop-shadow-[1px_1px_0_#000]">
          <span v-if="n <= Math.round(gameStore.game.rating)">★</span>
          <span v-else>☆</span>
        </span>
        <span class="ml-2 text-white drop-shadow-[1px_1px_0_#000]">({{ gameStore.game.rating }})</span>
      </div>
    </div>

    <section class="mt-8 persona-body text-sm text-gray-300">
      <p v-if="!showFullDescription">{{ shortDescription }}</p>
      <div v-else v-html="gameStore.game.description || 'No hay descripción disponible.'"></div>

      <button @click="showFullDescription = !showFullDescription"
        class="mt-2 text-red-400 hover:text-red-300 transition font-semibold underline text-xs">
        {{ showFullDescription ? 'Ver menos' : 'Ver más' }}
      </button>
    </section>

    <section class="mt-4 persona-body text-sm text-gray-300">
      <p><strong>Fecha de lanzamiento:</strong> {{ gameStore.game.released || 'Desconocida' }}</p>
      <p><strong>Metacritic:</strong> {{ gameStore.game.metacritic || 'No disponible' }}</p>
    </section>
  </section>
</template>

<style>
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

.persona-font {
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.persona-body {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.6;
}
</style>
