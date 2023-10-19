<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import DisciplineDetail from '@/disciplines/components/DisciplineDetail.vue'
import { useDisciplines } from '@/disciplines/composable'
import { ref } from 'vue';

const { discipline } = useDisciplines()
const disciplineDetails = ref({})
const errorMessage = ref('')

const route = useRoute()

onMounted(async () => {
    const [res, error] = await discipline(route.params.id)
    if (error) {
        errorMessage.value = 'Erro ao buscar detalhes da Disciplina'
        return
    }

    disciplineDetails.value = res
})

</script>

<template>
    <v-container>
        <h1 class="mb-12 color-green">Detalhes da Disciplina</h1>
        <DisciplineDetail
            :details="disciplineDetails"
            :errorMessage="errorMessage"
        />
    </v-container>
</template>

<style>
.color-green {
  color: #006600 !important;
}
</style>
