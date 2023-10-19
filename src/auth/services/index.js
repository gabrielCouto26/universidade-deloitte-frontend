import { http } from '@/base/plugins/axios'

async function getToken(username, password){
    try {
        const res = await http.post('/token', { username, password })
        return [res.data, null]
    } catch (error) {
        return [null, error]
    }
}

async function getUserInfo(){
    try {
        const res = await http.get('/api/user-info')
        return [res.data, null]
    } catch (error) {
        return [null, error]
    }
}

function logout() {
    localStorage.clear()
}

export {
    getToken,
    getUserInfo,
    logout
}