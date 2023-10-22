const STUDENT_USER_TYPE = 1
const TEACHER_USER_TYPE = 2
const COORDINATOR_USER_TYPE = 3

const NAV_BAR_ITEMS = [
    {
        name: 'Disciplinas',
        permission_name: 'Discipline',
        route: '/'
    },
    {
        name: 'Professores',
        permission_name: 'Teacher',
        route: '/teachers'
    },
    {
        name: 'Alunos',
        permission_name: 'Student',
        route: '/students'
    },
]

export {
    STUDENT_USER_TYPE,
    TEACHER_USER_TYPE,
    COORDINATOR_USER_TYPE,
    NAV_BAR_ITEMS
}