export const DisciplineRoutes = [
    {
        path: '/discipline/new',
        name: 'NewDiscipline',
        component: () => import('@/disciplines/views/Discipline.vue')
    }
]
