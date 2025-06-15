<script setup>
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToDetails() {
  router.push({ name: 'GameDetails', params: { id: props.game.id } })
}

const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
})

const FAVORITES_KEY = 'favoriteGames'

// Estado local si este juego está en favoritos
const isFavorite = ref(false)

// Chequeo si el juego ya está en favoritos (localStorage)
const loadFavorites = () => {
  const favs = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
  isFavorite.value = favs.some(g => g.id === props.game.id)
}

// Guardar la lista completa de favoritos en localStorage
const saveFavorites = (favs) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs))
}

// Agregar o remover el juego de favoritos
const toggleFavorite = () => {
  const favs = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')

  if (isFavorite.value) {
    // Quitar de favoritos
    const newFavs = favs.filter(g => g.id !== props.game.id)
    saveFavorites(newFavs)
    isFavorite.value = false
  } else {
    if (favs.length >= 5) {
      alert('Solo puedes tener un máximo de 5 juegos favoritos.')
      return
    }
    // Agregar a favoritos
    favs.push(props.game)
    saveFavorites(favs)
    isFavorite.value = true
  }

  // Disparar evento luego de actualizar localStorage y estado
  window.dispatchEvent(new Event('favorites-changed'))
}


// Cargo al montar el componente el estado inicial
loadFavorites()

// Opcional: si cambian los props.game, recargo estado (por las dudas)
watch(() => props.game, loadFavorites)
</script>

<template>
  <Card
    @click="goToDetails"
    class="relative bg-red-800 text-white rounded-xl shadow-[8px_8px_0px_0px_black] overflow-hidden transform transition duration-300 hover:scale-105 hover:rotate-[-1.5deg] hover:shadow-[12px_12px_0px_0px_black] shine-container">
    <div class="absolute -top-3 -left-3 w-full h-full border-4 border-white rotate-[-1deg] z-0 pointer-events-none">
    </div>

    <div class="shine-overlay"></div>

    <CardContent class="relative z-10 p-0">
      <img :src="props.game.background_image" :alt="props.game.name"
        class="w-full h-40 object-cover brightness-75 saturate-150" />
    </CardContent>

    <CardFooter class="relative z-10 flex flex-col items-start p-4 bg-black bg-opacity-70">
      <h2 class="text-xl font-extrabold tracking-wide uppercase w-full text-white drop-shadow-[2px_2px_0px_#000]">
        {{ props.game.name }}
      </h2>
      <div class="flex items-center mt-2 w-full justify-between">
        <div>
          <span v-for="n in 5" :key="n" class="text-yellow-400 text-sm drop-shadow-[1px_1px_0px_#000]">
            <span v-if="n <= Math.round(props.game.rating)">★</span>
            <span v-else>☆</span>
          </span>
          <span class="ml-2 text-xs text-white drop-shadow-[1px_1px_0px_#000]">({{ props.game.rating }})</span>
        </div>

        <button @click.stop.prevent="toggleFavorite" :class="[
          'px-3 py-1 rounded uppercase font-bold text-sm transition',
          isFavorite ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'
        ]">
          {{ isFavorite ? 'Quitar' : 'Favorito' }}
        </button>
      </div>
    </CardFooter>
  </Card>
</template>

<style scoped>
.shine-container {
  position: relative;
  overflow: hidden;
}

.shine-overlay {
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(120deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%);
  transform: skewX(-20deg);
  pointer-events: none;
  z-index: 20;
}

.shine-container:hover .shine-overlay {
  animation: shine-move 1.2s ease-out forwards;
}

@keyframes shine-move {
  0% {
    left: -75%;
  }

  100% {
    left: 125%;
  }
}
</style>
