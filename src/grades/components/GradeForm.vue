<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

const props = defineProps({
    register: Function,
    getStudents: Function,
    disciplines: Array
})

const router = useRouter()
const formValid = ref(false)
const form = reactive({
    value: 0,
    student: null,
    discipline: null
})

const message = ref('')
const loading = ref(false)

const students = reactive([])
const disciplineList = computed(() => {
    return props.disciplines.map(d => ({
        title: d.name,
        value: d.id
    }))
})

const disabledStudent = computed(() => {
    return form.discipline ? false : true
})

const disabledGrade = computed(() => {
    return form.student ? false : true
})

watch(form, async () => {
    if(form.discipline){
        const [studentsList, error] = await props.getStudents(form.discipline)
        if (error) {
            message.value = 'Erro ao buscar Alunos'
            return
        }

        students.value = studentsList.map(s => ({
            ...s,
            title: s.user?.name,
            value: s.id
        }))
    }
})

async function handleRegister() {
    if (!formValid.value)
        return

    message.value = ''
    loading.value = true

    const [res, error] = await props.register(form)

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
    <v-card class="mt-3 rounded-lg">
        <v-form v-model="formValid" >
            <v-card-item>
                <v-select
                    v-model="form.discipline"
                    label="Disciplina"
                    :items="disciplineList"
                    variant="underlined"
                />
            </v-card-item>

            <v-card-item>
                <v-select
                    v-model="form.student"
                    label="Aluno"
                    :items="students?.value"
                    :disabled="disabledStudent"
                    variant="underlined"
                />
            </v-card-item>

            <v-card-item>
                <v-text-field 
                    v-model.number="form.value"
                    label="Valor"
                    type="number"
                    min="0"
                    :disabled="disabledGrade"
                    variant="underlined"
                />
            </v-card-item>
        </v-form>
    </v-card>

    <v-alert v-if="message" type="error" class="justify-center mb-4">
        {{ message }}
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