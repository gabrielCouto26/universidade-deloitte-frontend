export const TeacherRoutes = [
    {
        path: '/teacher/new',
        name: 'NewTeacher',
        component: () => import('./views/TeacherRegister.vue')
    },
    {
        path: '/teachers',
        name: 'TeacherList',
        component: () => import('./views/TeacherList.vue')
    }
]
