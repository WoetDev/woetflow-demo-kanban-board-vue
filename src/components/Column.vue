<template>
  <div class="column q-py-md">
    <div class="c-bg-grey-1 q-pa-md q-mx-md rounded-borders text-blue-grey"><b>{{ column.label }}</b></div>

    <draggable 
      v-model="cards"
      :animation="200" 
      group="all-cards" 
      ghost-class="moving-card" 
      filter=".action-button" 
      class="q-pa-md q-mx-md q-gutter-md c-bg-grey-1 rounded-borders c-column"
    >
      <Card v-for="card in cards" :key="card.id" :card="card" />

    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Card from '../components/Card.vue'

export default {
  name: "Column",
  props: {
    column: {
      type: Object,
      required: true
    },
    cards: {
      type: Array,
      required: true
    }
  },
  components: {
    Draggable,
    Card
  }
}
</script>