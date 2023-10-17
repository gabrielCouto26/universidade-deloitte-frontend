<script setup>
  import Home from '@/home/components/Home.vue'
  import { useHome } from '@/home/composable'

  const { home } = useHome()
</script>

<template>
  <v-container>
    <Home 
      :list=home
    />
  </v-container>
</template>
