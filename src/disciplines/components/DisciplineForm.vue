<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive, computed } from 'vue'
import BaseForm from '@/base/components/BaseForm.vue';

const props = defineProps({
    register: Function,
    teachers: Array,
    students: Array
})

const router = useRouter()
const form = reactive({
    name: '',
    workload: 0,
    teacher: null,
    students: []
})

const message = ref('')

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
    message.value = ''

    const [res, error] = await props.register(form)

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
    <BaseForm
        :numFields="Object.keys(form).length"
        :message="message"
        :register="handleRegister"
        :cancel="handleCancel"
    >
        <template #field-1>
            <v-text-field
                v-model="form.name"
                label="Nome"
                variant="underlined"
            />
        </template>

        <template #field-2>
            <v-text-field
                v-model.number="form.workload"
                label="Carga horária"
                type="number"
                min="0"
                :disabled="disabledWorkload"
                variant="underlined"
            />
        </template>

        <template #field-3>
            <v-select
                v-model="form.teacher"
                label="Professor"
                :items="teacherList"
                :disabled="disabledTeacher"
                variant="underlined"
            />
        </template>

        <template #field-4>
            <v-select
                v-model="form.students"
                label="Alunos"
                :items="studentList"
                :disabled="disabledStudent"
                multiple
                variant="underlined"
            />
        </template>
    </BaseForm>
</template>