<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="flex bg-neutral-900 text-white min-h-screen">
    <Sidebar />
    <div class="ml-64 flex-1 overflow-y-auto">
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
