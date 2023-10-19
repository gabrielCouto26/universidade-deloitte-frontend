export const DisciplineRoutes = [
    {
        path: '/discipline/new',
        name: 'NewDiscipline',
        component: () => import('@/disciplines/views/DisciplineRegister.vue')
    },
    {
        path: '/discipline/:id',
        name: 'DisciplineDetail',
        component: () => import('@/disciplines/views/DisciplineDetail.vue')
    }
]
