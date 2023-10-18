<script setup>

const props = defineProps({
  headers: Array,
  items: Array,
  canAdd: Boolean,
  add: Function
})


</script>

<template>
  <v-container>
    <div 
      v-if="canAdd"
      class="d-flex flex-row justify-end">
      <v-btn 
        color="primary"
        @click="add">
        + Adicionar
      </v-btn>
    </div>

    <v-table class="base-data-table">
      <thead>
        <tr>
          <th 
            v-for="(item, i) in props.headers"
            :key="i"
          >
            {{  item.text }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, i) in props.items"
          :key="i"
        >
          <td
            v-for="header in props.headers"
            :key="header.value"
          >
            {{ item[header.value] }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>