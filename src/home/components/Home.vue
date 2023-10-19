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
const user = ref({})
const isCoordinator = ref(false)
const isStudent = ref(false)
const isTeacher = ref(false)

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
    const authUser = JSON.parse(localStorage.getItem('user'))
    if (!authUser) {
        message.value = 'Falha ao buscar informações de usuário'
        return
    }

    user.value = authUser
    if (authUser.user_type === 'Coordinator')
        isCoordinator.value = true
    else if (authUser.user_type === 'Student')
        isStudent.value = true
    else if (authUser.user_type === 'Teacher')
        isTeacher.value = true

    setTable()
    setCanAdd()
    setAddRoute()
}

async function handleGetDetails(id) {
    if (isCoordinator.value)
        router.push({ name: 'DisciplineDetail', params: { id } })
}

function handleAdd() {
    router.push({ name: addRoute.value })
}

function setTable() {
    if (isCoordinator.value) {
        title.value = 'Disciplinas'
        headers.value = [
            { text: 'Disciplina', value: 'name' }, 
            { text: 'Professor', value: 'teacher' },
            { text: 'Alunos', value: 'students'}
        ]
    } else if (isStudent.value) {
        title.value = 'Notas'
        headers.value = [
            { text: 'Disciplina', value: 'discipline' }, 
            { text: 'Nota', value: 'value' }
        ]
    } else if (isTeacher.value) {
        title.value = 'Notas'
        headers.value = [
            { text: 'Disciplina', value: 'discipline' }, 
            { text: 'Aluno', value: 'student' }, 
            { text: 'Nota', value: 'value' }
        ]
    }
}

function setCanAdd() {
    if (isCoordinator.value) {
        const can = user.value?.permissions.filter(p => (p.resource === 'Discipline' && p.can_write)).length
        canAdd.value = can ? true : false
    } else if (isStudent.value || isTeacher.value){
        const can = user.value?.permissions.filter(p => (p.resource === 'Grade' && p.can_write)).length
        canAdd.value = can ? true : false
    }
}

function setAddRoute() {
    if (isCoordinator.value) {
        addRoute.value = 'NewDiscipline'
    } else if (isStudent.value || isTeacher.value){
        addRoute.value = 'NewGrade'
    }
}

onMounted(async () => {
    await handleUserInfo()
    await handleList()
})

</script>

<template>
    <div class="mt-10">
        <h1 class="color-green"> {{ title }} </h1>

        <BaseTable 
            :headers="headers"
            :items="items"
            :canAdd="canAdd"
            :add="handleAdd"
            :getDetails="handleGetDetails"
        />
    </div>
</template>

<style>
.color-green {
  color: #006600 !important;
}
</style>
