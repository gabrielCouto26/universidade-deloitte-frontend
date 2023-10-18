<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const props = defineProps({
    register: Function,
    students: Array,
    disciplines: Array
})

const router = useRouter()
const formValid = ref(false)
const form = ref({
    value: 0,
    student: [],
    discipline: []
})

const message = ref('')
const loading = ref(false)

const studentsList = computed(() => {
    return props.students.map(s => ({
        title: s.user?.name,
        value: s.id
    }))
})

const disciplineList = computed(() => {
    return props.disciplines.map(s => ({
        title: s.name,
        value: s.id
    }))
})

async function handleRegister() {
    if (!formValid.value)
        return

    message.value = ''
    loading.value = true

    const [res, error] = await props.register(form.value)

    loading.value = false

    if (error) {
        message.value = 'Erro ao cadastrar Nota'
        return
    }

    if (res){
        router.push({ name: 'Home' })
    }
}

function handleCancel() {
    router.back()
}

</script>

<template>
    <v-form
        v-model="formValid"
    >
        <v-text-field 
            v-model="form.value"
            label="Valor"
        />

        <v-select
            v-model="form.student"
            label="Aluno"
            :items="studentsList"
        />

        <v-select
            v-model="form.discipline"
            label="Disciplina"
            :items="disciplineList"
        />
    </v-form>

    <v-alert v-if="message" type="error" class="justify-center mb-4">
        {{ message }}
    </v-alert>

    <v-btn
        color="primary"
        :loading="loading"
        type="submit"
        @click.prevent="handleRegister"
    >
        Cadastrar
    </v-btn>

    <v-btn
        @click="handleCancel"
        class="ml-4"
    >
        Cancelar
    </v-btn>
</template>