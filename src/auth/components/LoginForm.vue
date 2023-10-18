<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';


const props = defineProps({
    action: Function,
    callback: Function
})

const router = useRouter()
const formValid = ref(false)
const form = reactive({
    email: '',
    password: ''
})

const message = ref('')
const loading = ref(false)

async function handleLogin() {
    if (!formValid.value)
        return

    message.value = ''
    loading.value = true

    const [token, error] = await props.action(form.email, form.password)

    loading.value = false

    if (error && error.response?.status === 400) {
        message.value = 'Email ou senha incorretos'
        return
    }

    if (token){
        await props.callback()
        router.push({ name: 'Home' })
    }
}

</script>

<template>
    <v-form
        v-model="formValid"
    >
        <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            class="mb-2"
        />

        <v-text-field
            v-model="form.password"
            label="Senha"
            type="password"
        />
    </v-form>

    <v-alert v-if="message" type="error" class="justify-center mb-4">
        {{ message }}
    </v-alert>

    <v-btn
        block
        color="primary"
        :loading="loading"
        type="submit"
        @click="handleLogin"
    >
        Entrar
    </v-btn>
</template>
