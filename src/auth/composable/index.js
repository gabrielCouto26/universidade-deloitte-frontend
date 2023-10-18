import { getToken, getUserInfo } from '@/auth/services'

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

    async function userInfo() {
        const [res, error] = await getUserInfo()
        if (error)
            return [null, error]

        if (res)
            localStorage.setItem('user', JSON.stringify(res))
    }

    return {
        login,
        userInfo
    }
}
