<script setup>
import { onMounted } from 'vue';
import GradeForm from '@/grades/components/GradeForm.vue'
import { useStudents } from '@/students/composable'
import { useDisciplines } from '@/disciplines/composable'
import { useGrade } from '@/grades/composable'

const { students, studentsList } = useStudents()
const { disciplines, disciplinesList } = useDisciplines()
const { addGrade } = useGrade()


onMounted(async () => {
    await studentsList()
    await disciplinesList()
})

</script>

<template>
    <v-container>
        <h1 class="mb-12">Cadastre uma nova Nota</h1>
        <GradeForm
            :register="addGrade"
            :students="students"
            :disciplines="disciplines"
        />
    </v-container>
</template>