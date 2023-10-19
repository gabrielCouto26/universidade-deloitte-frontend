<script setup>
import LoginForm from '@/auth/components/LoginForm.vue'
import { useAuth } from '@/auth/composable'

const { login, userInfo } = useAuth()
</script>

<template>
    <v-container>
        <h1 class="mb-12" :style="{color: '#006600'}">Entre com sua conta</h1>
        <LoginForm
            :action=login
            :callback=userInfo
        />
    </v-container>
</template>
