<script setup>
import LoginForm from '@/auth/components/LoginForm.vue'
import { useAuth } from '@/auth/composable'

const { login } = useAuth()
</script>

<template>
    <v-container>
        <h1 class="mb-12">Entre com sua conta</h1>
        <LoginForm
            :action=login
        />
    </v-container>
</template>
