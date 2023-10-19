<script setup>
import { onMounted } from 'vue';
import DisciplineForm from '@/disciplines/components/DisciplineForm.vue'
import { useDisciplines } from '@/disciplines/composable'
import { useTeachers } from '@/teachers/composable'
import { useStudents } from '@/students/composable'

const { addDisciplines } = useDisciplines()
const { teachers, teachersList } = useTeachers()
const { students, studentsList } = useStudents()

onMounted(async () => {
    await teachersList()
    await studentsList()
})

</script>

<template>
    <v-container>
        <h1 class="mb-12">Cadastre uma nova Disciplina</h1>
        <DisciplineForm
            :register="addDisciplines"
            :teachers="teachers"
            :students="students"
        />
    </v-container>
</template>