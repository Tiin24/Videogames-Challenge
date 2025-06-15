<!-- App.vue -->
<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/Layout/MainLayout.vue'
import { RouterView } from 'vue-router';
</script>
