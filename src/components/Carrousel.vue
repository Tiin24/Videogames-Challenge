<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'

defineProps({
  games: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <Carousel v-if="games.length" class="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-[8px_8px_0_0_black]"
    :opts="{ loop: true }">
    <CarouselContent>
      <CarouselItem v-for="game in games" :key="game.id" class="relative group">
        <img :src="game.background_image" :alt="game.name"
          class="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div class="absolute bottom-4 left-4 bg-red-700/90 px-4 py-2 rounded persona-font text-white text-lg shadow-md">
          {{ game.name }}
        </div>
      </CarouselItem>
    </CarouselContent>

    <CarouselPrevious class="left-1 bg-red-700 border-none" />
    <CarouselNext class="right-2 bg-red-700 border-none" />
  </Carousel>
  <div v-else class="text-white text-center p-6">No hay juegos para mostrar.</div>
</template>

<style scoped>
.persona-font {
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
