import { http } from '@/base/plugins/axios'

async function getDiscipline(id){
    try {
        const res = await http.get(`/api/disciplines/${id}`)
        return [res.data, null]
    } catch (error) {
        return [null, error]
    }
}

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
        const res = await http.get(`/api/disciplines/${id}/students`)
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
    getDiscipline,
    getDisciplines,
    getTeacherDisciplines,
    getDisciplineStudents,
    createDiscipline
}