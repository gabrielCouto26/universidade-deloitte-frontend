<script setup>
import { ref } from 'vue'

const props = defineProps({
    vModel: Boolean,
    numFields: Number,
    message: String,
    register: Function,
    cancel: Function
})
const formValid = ref(false)

async function handleRegister() {
    if (formValid) {
        if (!formValid.value)
        return
    }

    await props.register()
}

</script>

<template>
    <v-card class="mt-3 rounded-lg">
        <v-form v-model="formValid" >
            <div v-for="index in props.numFields" :key="index">
                <v-card-item>
                    <slot :name="`field-${index}`">
                    </slot>
                </v-card-item>
            </div>
        </v-form>
    </v-card>

    <v-alert v-if="props.message" type="error" class="justify-center my-4">
        {{ props.message || 'Erro inesperado' }}
    </v-alert>

    <div class="mt-4">
        <v-btn
            color="#006600"
            type="submit"
            @click.prevent="handleRegister"
        >
            Cadastrar
        </v-btn>

        <v-btn
            @click="props.cancel"
            class="ml-4"
        >
            Cancelar
        </v-btn>
    </div>
</template>
