<script setup>
import { onMounted } from 'vue';
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { BaseTable } from '@/base/components'

const props = defineProps({
    list: Function
})

const router = useRouter()
const title = ref('Inicio')
const message = ref('')
const loading = ref(false)
const headers = ref([
    { text: 'Disciplina', value: 'discipline' }, 
    { text: 'Nota', value: 'value' }
])
const items = ref([])

async function handleList() {
    message.value = ''
    loading.value = true

    const [res, error] = await props.list()

    loading.value = false

    if (error) {
        message.value = 'Falha ao carregar informações'
        return
    }

    if (res)
        items.value = res
}

onMounted(async () => {
    await handleList()
})

</script>

<template>
    <h1> {{ title }} </h1>

    <BaseTable 
        :headers="headers"
        :items="items"
    />

</template>
