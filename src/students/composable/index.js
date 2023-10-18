import { ref } from 'vue'
import { getStudents } from '@/students/services'

export const useStudents = () => {
    const students = ref([])

    async function studentsList() {
        const [res, error] = await getStudents()
        students.value = res
        if (error)
            return [null, error]

        if (res) {
            return [res, null]
        }
    }

    return {
        students,
        studentsList,
    }
}
