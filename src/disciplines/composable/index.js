import { ref } from 'vue'
import {
    getDiscipline,
    getDisciplines,
    createDiscipline,
    getTeacherDisciplines,
    getDisciplineStudents } from '@/disciplines/services'

export const useDisciplines = () => {
    const disciplines = ref([])
    const teacherDisciplines = ref([])

    async function discipline(id) {
        const [res, error] = await getDiscipline(id)
        if (error)
            return [null, error]

        if (res) {
            return [res, null]
        }
    }


    async function disciplinesList() {
        const [res, error] = await getDisciplines()
        disciplines.value = res
        if (error)
            return [null, error]

        if (res) {
            return [res, null]
        }
    }

    async function teacherDisciplinesList() {
        const [res, error] = await getTeacherDisciplines()
        teacherDisciplines.value = res
        if (error)
            return [null, error]

        if (res) {
            return [res, null]
        }
    }

    async function disciplineStudentsList(id) {
        const [res, error] = await getDisciplineStudents(id)
        if (error)
            return [null, error]

        if (res) {
            return [res, null]
        }
    }

    async function addDisciplines(data) {
        const [res, error] = await createDiscipline(data)
        if (error)
            return [null, error]

        if (res) {
            return [res, null]
        }
    }

    return {
        disciplines,
        teacherDisciplines,
        discipline,
        disciplinesList,
        teacherDisciplinesList,
        disciplineStudentsList,
        addDisciplines
    }
}
