<script setup>
import LoginForm from '@/auth/components/LoginForm.vue'
import { useAuth } from '@/auth/composable'

const { login, userInfo } = useAuth()
</script>

<template>
    <v-container>
        <h1 class="my-12 color-green">Entre com sua conta</h1>
        <LoginForm
            :action=login
            :callback=userInfo
        />
    </v-container>
</template>

<style>
.color-green {
  color: #006600 !important;
}
</style>
