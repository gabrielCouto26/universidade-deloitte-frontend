<script setup>
import { onMounted } from 'vue';
import GradeForm from '@/grades/components/GradeForm.vue'
import { useDisciplines } from '@/disciplines/composable'
import { useGrade } from '@/grades/composable'

const { addGrade } = useGrade()
const {
    teacherDisciplines,
    teacherDisciplinesList,
    disciplineStudentsList } = useDisciplines()


onMounted(async () => {
    await teacherDisciplinesList()
})

</script>

<template>
    <v-container>
        <h1 class="mb-12" :style="{color: '#006600'}">Cadastre uma nova Nota</h1>
        <GradeForm
            :register="addGrade"
            :getStudents="disciplineStudentsList"
            :disciplines="teacherDisciplines"
        />
    </v-container>
</template>