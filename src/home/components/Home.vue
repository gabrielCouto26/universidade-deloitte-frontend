<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { BaseTable } from '@/base/components'

const props = defineProps({
    list: Function
})

const router = useRouter()
const title = ref('Inicio')
const message = ref('')
const loading = ref(false)
const headers = ref([])
const items = ref([])
const canAdd = ref(false)
const addRoute = ref('')

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

async function handleUserInfo() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
        message.value = 'Falha ao buscar informações de usuário'
        return
    }

    setTable(user.user_type)
    setCanAdd(user.user_type, user.permissions)
    setAddRoute(user.user_type)
}

function handleAdd() {
    router.push({ name: addRoute.value })
}

function setTable(userType) {
    if (userType === 'Coordinator') {
        title.value = 'Disciplinas'
        headers.value = [
            { text: 'Disciplina', value: 'name' }, 
            { text: 'Professor', value: 'teacher' },
            { text: 'Alunos', value: 'students'}
        ]
    } else if (userType === 'Student' || userType === 'Teacher'){
        title.value = 'Notas'
        headers.value = [
            { text: 'Disciplina', value: 'discipline' }, 
            { text: 'Nota', value: 'value' }
        ]
    }
}

function setCanAdd(userType, permissions) {
    if (userType === 'Coordinator') {
        const can = permissions.filter(p => (p.resource === 'Discipline' && p.can_write)).length
        canAdd.value = can ? true : false
    } else if (userType === 'Student' || userType === 'Teacher'){
        const can = permissions.filter(p => (p.resource === 'Grade' && p.can_write)).length
        canAdd.value = can ? true : false
    }
}

function setAddRoute(userType) {
    if (userType === 'Coordinator') {
        addRoute.value = 'NewDiscipline'
    } else if (userType === 'Student' || userType === 'Teacher'){
        addRoute.value = 'NewGrade'
    }
}

onMounted(async () => {
    await handleUserInfo()
    await handleList()
})

</script>

<template>
    <h1> {{ title }} </h1>

    <BaseTable 
        :headers="headers"
        :items="items"
        :canAdd="canAdd"
        :add="handleAdd"
    />

</template>
