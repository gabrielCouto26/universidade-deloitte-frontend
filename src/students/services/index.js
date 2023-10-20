import { http } from '@/base/plugins/axios'

async function getStudents(){
    try {
        const res = await http.get('/api/students/')
        return [res.data?.results, null]
    } catch (error) {
        return [null, error]
    }
}

async function createStudent(data){
    try {
        const res = await http.post('/api/students/', data)
        return [res.data, null]
    } catch (error) {
        return [null, error]
    }
}

export {
    getStudents,
    createStudent
}