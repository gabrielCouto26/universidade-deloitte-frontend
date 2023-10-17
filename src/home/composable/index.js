import { getHome } from "@/home/services"

export const useHome = () => {
    async function home() {
        const [res, error] = await getHome()
        if (error)
            return [null, error]

        return [res, null]
    }

    return {
        home
    }
}
