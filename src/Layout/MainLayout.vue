<script setup>
import Sidebar from '@/components/Sidebar.vue'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
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
  <Toaster position="top-center" rich-colors/>
</template>
