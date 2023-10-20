<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import BaseForm from '@/base/components/BaseForm.vue';

const props = defineProps({
    register: Function,
})

const router = useRouter()
const form = reactive({
    name: '',
    email: '',
    birthday: ''
})

const message = ref('')

async function handleRegister() {
    message.value = ''

    const [res, error] = await props.register(form)

    if (error) {
        message.value = 'Erro ao cadastrar Professor'
        return
    }

    if (res){
        router.push({ name: 'Home' })
    }
}

function handleCancel() {
    router.back()
}

</script>

<template>
    <BaseForm
        :numFields="Object.keys(form).length"
        :message="message"
        :register="handleRegister"
        :cancel="handleCancel"
    >
        <template #field-1>
            <v-text-field 
                v-model="form.name"
                label="Nome"
                variant="underlined"
            />
        </template>

        <template #field-2>
            <v-text-field 
                v-model="form.email"
                label="Email"
                variant="underlined"
            />
        </template>

        <template #field-3>
            <v-text-field 
                v-model="form.birthday"
                label="Data de nascimento"
                type="date"
                variant="underlined"
            />
        </template>
    </BaseForm>
</template>
