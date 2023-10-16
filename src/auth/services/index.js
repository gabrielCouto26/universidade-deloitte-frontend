import { http } from '@/base/plugins/axios'

async function getToken(username, password){
    try {
        const res = await http.post('/token', { username, password })
        return [res.data, null]
    } catch (error) {
        return [null, error]
    }
}

export {
    getToken
}