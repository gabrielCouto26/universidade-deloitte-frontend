<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive, computed } from 'vue'

const props = defineProps({
    register: Function,
    teachers: Array,
    students: Array
})

const router = useRouter()
const formValid = ref(false)
const form = reactive({
    name: '',
    workload: 0,
    teacher: null,
    students: []
})

const message = ref('')
const loading = ref(false)

const teacherList = computed(() => {
    return props.teachers.map(t => ({
        title: t.user.name,
        value: t.id
    }))
})

const studentList = computed(() => {
    return props.students.map(s => ({
        title: s.user.name,
        value: s.id
    }))
})

const disabledWorkload = computed(() => {
    return form.name ? false : true
})

const disabledTeacher = computed(() => {
    return form.workload ? false : true
})

const disabledStudent = computed(() => {
    return form.teacher ? false : true
})


async function handleRegister() {
    if (!formValid.value)
        return

    message.value = ''
    loading.value = true

    const [res, error] = await props.register(form)

    loading.value = false

    if (error) {
        message.value = 'Erro ao cadastrar Disciplina'
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
    <v-card class="mt-3 rounded-lg">
        <v-form v-model="formValid">
            <v-card-item>
                <v-text-field
                    v-model="form.name"
                    label="Nome"
                    variant="underlined"
                />
            </v-card-item>

            <v-card-item>
                <v-text-field
                    v-model.number="form.workload"
                    label="Carga horária"
                    type="number"
                    min="0"
                    :disabled="disabledWorkload"
                    variant="underlined"
                />
            </v-card-item>

            <v-card-item>
                <v-select
                    v-model="form.teacher"
                    label="Professor"
                    :items="teacherList"
                    :disabled="disabledTeacher"
                    variant="underlined"
                />
            </v-card-item>

            <v-card-item>
                <v-select
                    v-model="form.students"
                    label="Alunos"
                    :items="studentList"
                    :disabled="disabledStudent"
                    multiple
                    variant="underlined"
                />
            </v-card-item>
        </v-form>
    </v-card>

    <v-alert v-if="message" type="error" class="justify-center my-4">
        {{ message || 'Erro inesperado' }}
    </v-alert>

    <div class="mt-4">
        <v-btn
            color="#006600"
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
    </div>
</template>