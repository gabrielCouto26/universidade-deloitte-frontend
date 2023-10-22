
<script setup>
import { useTeachers } from '@/teachers/composable'
import TeacherForm from '@/teachers/components/TeacherForm'

const { addTeacher } = useTeachers()
</script>

<template>
    <v-container>
        <h1 class="mb-12 color-green">Cadastre um novo Professor</h1>
        <TeacherForm 
            :register="addTeacher"
        />
    </v-container>
</template>

<style>
.color-green {
  color: #006600 !important;
}
</style>
