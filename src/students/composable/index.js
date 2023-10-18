import { getStudents } from '@/students/services'

export const useStudents = () => {
    async function studentsList() {
        const [res, error] = await getStudents()
        if (error)
            return [null, error]

        if (res) {
            return [res, null]
        }
    }

    return {
        studentsList,
    }
}
