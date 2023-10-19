<template>
  <v-app class="background">
    <default-bar />

    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>

<style>
.background {
  background-color: #e6e6e6 !important;
}
</style>