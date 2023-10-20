export const StudentRoutes = [
    {
        path: '/student/new',
        name: 'NewStudent',
        component: () => import('./views/Student.vue')
    }
]
