<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    details: Object,
    errorMessage: String
})

const router = useRouter()
function handleCancel() {
    router.back()
}

</script>

<template>
    <v-card class="rounded-lg pa-4 show-overflow">
        <template v-if="errorMessage">
            <v-alert type="error" class="justify-center mb-4">
                {{ errorMessage }}
            </v-alert>
        </template>
        <template v-else>
            <v-card-item>
                <v-card-title>
                    <h3>{{ details.name }}</h3>
                </v-card-title>
            </v-card-item>

            <hr/>

            <v-card-item>
                <span class="text-body-1 font-weight-medium">Carga horária</span>
                <span class="d-block">{{ details.workload }}</span>
            </v-card-item>

            <v-card-item>
                <span class="text-body-1 font-weight-medium">Professor</span>
                <span class="d-block">{{ details.teacher }}</span>
            </v-card-item>

            <v-card-item>
                <span class="text-body-1 font-weight-medium">Alunos</span>
                <v-list lines="one">
                    <v-list-item
                        v-for="student in details.students"
                        :key="student.id"
                        :title="student.user.name"
                        :subtitle="student.user.email"
                    />
                </v-list>
            </v-card-item>
        </template>
    </v-card>
    <v-btn
        @click="handleCancel"
        class="mt-4"
    >
        Voltar
    </v-btn>
</template>