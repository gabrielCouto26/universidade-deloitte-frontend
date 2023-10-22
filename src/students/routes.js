export const StudentRoutes = [
    {
        path: '/student/new',
        name: 'NewStudent',
        component: () => import('./views/StudentRegister.vue')
    },
    {
        path: '/students',
        name: 'StudentList',
        component: () => import('./views/StudentList.vue')
    }
]
