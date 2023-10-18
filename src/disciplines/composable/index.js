import { getDisciplines } from '@/disciplines/services'

export const useDisciplines = () => {
    async function disciplinesList() {
        const [res, error] = await getDisciplines()
        if (error)
            return [null, error]

        if (res) {
            return [res, null]
        }
    }

    return {
        disciplinesList,
    }
}
