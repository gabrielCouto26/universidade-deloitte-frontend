import { ref } from 'vue'
import { getStudents, createStudent } from '@/students/services'
import { STUDENT_USER_TYPE } from '@/base/enums'

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

    async function addStudent(data) {
        data.user_type = STUDENT_USER_TYPE
        const [res, error] = await createStudent({ user: data })
        if (error)
            return [null, error]

        if (res)
            return [res, null]
    }

    return {
        students,
        studentsList,
        addStudent
    }
}
