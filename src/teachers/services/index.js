import { http } from '@/base/plugins/axios'

async function getTeachers(){
    try {
        const res = await http.get('/api/teachers/')
        return [res.data?.results, null]
    } catch (error) {
        return [null, error]
    }
}

async function createTeacher(data){
    try {
        const res = await http.post('/api/teachers/', data)
        return [res.data, null]
    } catch (error) {
        return [null, error]
    }
}

export {
    getTeachers,
    createTeacher
}