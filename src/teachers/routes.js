export const TeacherRoutes = [
    {
        path: '/teacher/new',
        name: 'NewTeacher',
        component: () => import('./views/Teacher.vue')
    }
]
