import { http } from '@/base/plugins/axios'

async function getDisciplines(){
    try {
        const res = await http.get('/api/disciplines/')
        return [res.data?.results, null]
    } catch (error) {
        return [null, error]
    }
}

async function getTeacherDisciplines(){
    try {
        const res = await http.get('/api/teachers/disciplines')
        return [res.data?.results, null]
    } catch (error) {
        return [null, error]
    }
}

async function getDisciplineStudents(id){
    try {
        const res = await http.get(`/api/discipline/${id}/students`)
        return [res.data?.results, null]
    } catch (error) {
        return [null, error]
    }
}

async function createDiscipline(data) {
    try {
        const res = await http.post('/api/disciplines/', data)
        return [res.data, null]
    } catch (error) {
        return [null, error]
    }
}

export {
    getDisciplines,
    getTeacherDisciplines,
    getDisciplineStudents,
    createDiscipline
}