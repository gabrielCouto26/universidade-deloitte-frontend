import { http } from '@/base/plugins/axios'

async function getHome(){
    try {
        const res = await http.get('/api/home')
        return [res.data?.results, null]
    } catch (error) {
        return [null, error]
    }
}

export {
    getHome
}