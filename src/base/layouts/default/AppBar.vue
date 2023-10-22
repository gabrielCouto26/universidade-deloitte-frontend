<script setup>
import { logout } from '@/auth/services'
import { ref } from 'vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router'
import { NAV_BAR_ITEMS } from '@/base/enums'

const router = useRouter()
const isLogedIn = ref(true)
const navBarItems = ref([])
const userResourcePermissions = ref([])

function handleLogout() {
  logout()
  userResourcePermissions.value = []
  navBarItems.value = []
  router.push('/login')
}

function handleHome() {
  router.push('/')
}

function handleRedirect(route) {
  router.push(route)
}

function handleNavBar() {
  const authUser = JSON.parse(localStorage.getItem('user'))
  if (!authUser)
    return

  for (let permission of authUser.permissions) {
    if (permission.can_read)
      userResourcePermissions.value.push(permission.resource)
  }
  
  navBarItems.value = NAV_BAR_ITEMS.filter(item => {
    const hasPermission = userResourcePermissions.value.includes(item.permission_name)
    if (hasPermission) {
      return {
        name: item.name,
        route: item.route
      }
    }
  })
}

watch(router.currentRoute, () => {
  isLogedIn.value = router.currentRoute.value.href !== '/login'
  if(isLogedIn.value)
    handleNavBar()
})

</script>

<template>
  <v-app-bar flat class="background-green">
    <v-app-bar-title class="font-weight-bold mouseover" @click="handleHome">
      Universidade Deloitte
    </v-app-bar-title>

    <div
      v-if="isLogedIn"
      v-for="item in navBarItems"
      @click="handleRedirect(item.route)"
      :key="item.name"
      class="mr-5 mouseover"
      >
      {{ item.name }}
    </div>

    <v-btn v-if="isLogedIn" @click="handleLogout">
      Sair
    </v-btn>
  </v-app-bar>
</template>

<style>
.background-green {
  background-color: #006600 !important;
  color: white !important;
}
.mouseover:hover {
  cursor: pointer;
  font-weight: bold;
}
</style>