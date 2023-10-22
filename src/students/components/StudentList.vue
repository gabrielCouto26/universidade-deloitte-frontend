<script setup>
import { ref, computed } from 'vue';
import { BaseTable } from '@/base/components'
import { useRouter } from 'vue-router';

const props = defineProps({
    students: Array
})

const router = useRouter()

const headers = ref([
    { text: 'Nome', value: 'name' },
    { text: 'Email', value: 'email' },
    { text: 'Data de nascimento', value: 'birthday' },
])

const items = computed(() => {
    return props.students.map(t => ({
        name: t.user.name,
        email: t.user.email,
        birthday: normalizeDate(t.user.birthday)
    }))
})

function handleAdd() {
    router.push({ name: 'NewStudent' })
}

function normalizeDate(date) {
    return date.split('-').reverse().join('/')
}
</script>

<template>
    <div class="mt-10">
        <h1 class="color-green">Alunos</h1>

        <BaseTable 
            :headers="headers"
            :items="items"
            :canAdd="true"
            :add="handleAdd"
        />
    </div>
</template>
