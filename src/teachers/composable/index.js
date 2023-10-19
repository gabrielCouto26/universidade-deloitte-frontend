import { ref } from 'vue'
import { getTeachers } from '@/teachers/services'

export const useTeachers = () => {
    const teachers = ref([])

    async function teachersList() {
        const [res, error] = await getTeachers()
        teachers.value = res
        if (error)
            return [null, error]

        if (res) {
            return [res, null]
        }
    }

    return {
        teachers,
        teachersList,
    }
}
