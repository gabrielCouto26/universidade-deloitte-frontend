import { http } from '@/base/plugins/axios'

async function createGrade(data){
    try {
        const res = await http.post('/api/grades/', data)
        return [res.data, null]
    } catch (error) {
        return [null, error]
    }
}

export {
    createGrade,
}