<script setup>
import TeacherList from '@/teachers/components/TeacherList.vue'
import { useTeachers } from '@/teachers/composable'
import { onMounted } from 'vue';

const { teachers, teachersList } = useTeachers()

onMounted(() => {
    teachersList()
})
</script>

<template>
    <v-container>
        <TeacherList
            :teachers="teachers"
        />
    </v-container>
</template>
