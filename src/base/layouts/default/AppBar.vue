<script setup>
import { logout } from '@/auth/services'
import { ref } from 'vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const showLogout = ref(true)

function handleLogout() {
  logout()
  router.push('/login')
}

watch(router.currentRoute, () => {
  showLogout.value = router.currentRoute.value.href !== '/login'
})

</script>

<template>
  <v-app-bar flat class="background-green">
    <v-app-bar-title class="font-weight-bold">
      Universidade Deloitte
    </v-app-bar-title>

    <v-btn v-if="showLogout" @click="handleLogout">
      Sair
    </v-btn>
  </v-app-bar>
</template>

<style>
.background-green {
  background-color: #006600 !important;
  color: white !important;
}
</style>