import { ref } from 'vue'
import { getTeachers, createTeacher } from '@/teachers/services'
import { TEACHER_USER_TYPE } from '@/base/enums'

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

    async function addTeacher(data) {
        data.user_type = TEACHER_USER_TYPE
        const [res, error] = await createTeacher({ user: data })
        if (error)
            return [null, error]

        if (res)
            return [res, null]
    }

    return {
        teachers,
        teachersList,
        addTeacher
    }
}
