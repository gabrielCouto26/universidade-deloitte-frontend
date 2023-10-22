<script setup>
import { ref } from 'vue';


const props = defineProps({
  headers: Array,
  items: Array,
  canAdd: Boolean,
  add: Function,
  getDetails: Function
})

const currentItemWithMouse = ref('')

function highlightItem(item) {
  currentItemWithMouse.value = item;
}
function unhighlightItem() {
  currentItemWithMouse.value = null;
}

</script>

<template>
  <div 
    v-if="canAdd"
    class="d-flex flex-row justify-end"
  >
    <v-btn 
      color="#006600"
      @click="add"
      class="mt-6">
      Adicionar +
    </v-btn>
  </div>

  <v-card class="mt-3 rounded-lg">
    <v-card-item>
      <v-table>
        <thead>
          <tr>
            <th 
              v-for="(item, i) in props.headers"
              :key="i"
            >
              <v-card-title>{{  item.text }}</v-card-title>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
              v-if="props.items?.length"
              v-for="(item, i) in props.items"
              :key="i"
              @mouseover="highlightItem(item)"
              @mouseleave="unhighlightItem(item)"
              :class="{ 'mouseover': item === currentItemWithMouse }"
            >
              <td
                v-for="header in props.headers"
                :key="header.value"
                @click="getDetails(item.id)"
              >
                {{ item[header.value] }}
              </td>
            </tr>
          <tr v-else>
            <td>
              Nenhum registro encontrado
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
</template>

<style>
.mouseover {
  cursor: pointer;
  background-color: #006600;
  color: white;
}
</style>