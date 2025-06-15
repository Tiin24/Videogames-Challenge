<script setup>
defineProps({
  src: String
})
defineEmits(['close'])
</script>

<template>
  <div v-if="src" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    @click.self="$emit('close')">
    <img :src="src" class="max-w-3xl max-h-[90vh] rounded shadow-lg border-4 border-white" />
    <button @click="$emit('close')"
      class="absolute top-4 right-4 text-white text-2xl font-bold bg-red-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-500 transition">
      ✕
    </button>
  </div>
</template>
