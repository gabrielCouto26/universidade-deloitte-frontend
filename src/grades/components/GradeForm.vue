<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import BaseForm from '@/base/components/BaseForm.vue';

const props = defineProps({
    register: Function,
    getStudents: Function,
    disciplines: Array
})

const router = useRouter()
const form = reactive({
    value: 0,
    student: null,
    discipline: null
})

const message = ref('')

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
    message.value = ''

    const [res, error] = await props.register(form)

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
    <BaseForm
        :numFields="Object.keys(form).length"
        :message="message"
        :register="handleRegister"
        :cancel="handleCancel"
    >
        <template #field-1>
            <v-select
                v-model="form.discipline"
                label="Disciplina"
                :items="disciplineList"
                variant="underlined"
            />
        </template>

        <template #field-2>
            <v-select
                v-model="form.student"
                label="Aluno"
                :items="students?.value"
                :disabled="disabledStudent"
                variant="underlined"
            />
        </template>

        <template #field-3>
            <v-text-field 
                v-model.number="form.value"
                label="Valor"
                type="number"
                min="0"
                :disabled="disabledGrade"
                variant="underlined"
            />
        </template>
    </BaseForm>
</template>