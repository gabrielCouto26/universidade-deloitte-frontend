import { http } from '@/base/plugins/axios'

async function getStudents(){
    try {
        const res = await http.get('/api/students/')
        return [res.data?.results, null]
    } catch (error) {
        return [null, error]
    }
}

export {
    getStudents,
}