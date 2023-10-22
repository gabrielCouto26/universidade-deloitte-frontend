
<script setup>
import { useStudents } from '@/students/composable'
import StudentForm from '@/students/components/StudentForm'

const { addStudent } = useStudents()
</script>

<template>
    <v-container>
        <h1 class="mb-12 color-green">Cadastre um novo Aluno</h1>
        <StudentForm 
            :register="addStudent"
        />
    </v-container>
</template>

<style>
.color-green {
  color: #006600 !important;
}
</style>
