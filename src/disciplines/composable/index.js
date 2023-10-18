import { ref } from 'vue'
import { getDisciplines } from '@/disciplines/services'

export const useDisciplines = () => {
    const disciplines = ref([])

    async function disciplinesList() {
        const [res, error] = await getDisciplines()
        disciplines.value = res
        if (error)
            return [null, error]

        if (res) {
            return [res, null]
        }
    }

    return {
        disciplines,
        disciplinesList,
    }
}
