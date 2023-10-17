<script setup>

const props = defineProps({
  headers: Array,
  items: Array
})


</script>

<template>
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
</template>