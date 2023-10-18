import { http } from '@/base/plugins/axios'

async function getDisciplines(){
    try {
        const res = await http.get('/api/disciplines/')
        return [res.data?.results, null]
    } catch (error) {
        return [null, error]
    }
}

export {
    getDisciplines,
}