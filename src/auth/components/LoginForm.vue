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
    <v-card class="mt-3 rounded-lg">
        <v-form
            v-model="formValid"
        >
            <v-card-item>
                <v-text-field
                    v-model="form.email"
                    label="Email"
                    type="email"
                    variant="underlined"
                />
            </v-card-item>

            <v-card-item>
                <v-text-field
                    v-model="form.password"
                    label="Senha"
                    type="password"
                    variant="underlined"
                />
            </v-card-item>
        </v-form>
    </v-card>

    <v-alert v-if="message" type="error" class="justify-center mb-4">
        {{ message }}
    </v-alert>

    <v-btn
        block
        color="#006600"
        :loading="loading"
        type="submit"
        @click="handleLogin"
        class="mt-4 py-6"
    >
        Entrar
    </v-btn>
</template>
