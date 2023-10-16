import { getToken } from '@/auth/services'

export const useAuth = () => {
    async function login(username, password) {
        const [res, error] = await getToken(username, password)
        if (error)
            return [null, error]

        const { token } = res
        if (token) {
            localStorage.setItem('authToken', token)
            return [token, null]
        }
    }

    return {
        login
    }
}
