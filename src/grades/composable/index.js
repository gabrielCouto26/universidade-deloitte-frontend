import { createGrade } from '@/grades/services'

export const useGrade = () => {
    async function addGrade(data) {
        const [res, error] = await createGrade(data)
        if (error)
            return [null, error]

        if (res)
            return [res, null]
    }

    return {
        addGrade
    }
}