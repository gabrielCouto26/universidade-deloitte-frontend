<script setup>
import StudentList from '@/students/components/StudentList.vue'
import { useStudents } from '@/students/composable'
import { onMounted } from 'vue';

const { students, studentsList } = useStudents()

onMounted(() => {
    studentsList()
})
</script>

<template>
    <v-container>
        <StudentList
            :students="students"
        />
    </v-container>
</template>
