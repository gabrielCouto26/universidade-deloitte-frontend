<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import BaseForm from '@/base/components/BaseForm.vue';

const props = defineProps({
    action: Function,
    callback: Function
})

const router = useRouter()
const form = reactive({
    email: '',
    password: ''
})

const message = ref('')

async function handleLogin() {
    message.value = ''

    const [token, error] = await props.action(form.email, form.password)

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
    <BaseForm
        :numFields="Object.keys(form).length"
        :message="message"
        :register="handleLogin"
    >
        <template #field-1>
            <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                variant="underlined"
            />
        </template>

        <template #field-2>
            <v-text-field
                v-model="form.password"
                label="Senha"
                type="password"
                variant="underlined"
            />
        </template>

        <template #buttons>
            <v-btn
                block
                color="#006600"
                type="submit"
                class="mt-4 py-6"
                @click="handleLogin"
            >
                Entrar
            </v-btn>
        </template>
    </BaseForm>
</template>
