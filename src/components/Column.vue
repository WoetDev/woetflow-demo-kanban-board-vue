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
      @change="changed($event, column)"
    >
      <Card v-for="card in cards" :key="card.id" :card="card" />

    </draggable>
  </div>
</template>

<script>
import api from '../api'
import Draggable from 'vuedraggable'
import Card from '../components/Card.vue'

export default {
  name: "Column",
  props: {
    column: {
      type: Object,
      required: true
    }
  },
  components: {
    Draggable,
    Card
  },
  computed: {
    cards: {
      get() {
        return this.$store.state.columns.find(column => column.id === this.column.id).cards
      },
      set(cards) {
        let column_id = this.column.id
        this.$store.commit("updateColumns", { column_id, cards })
      }
    }
  },
  methods: {
    changed(e, column) {
      if(e && e.added) {
        const updatedCard = {
          id: e.added.element.id,
          column_id: column.id
        }
        api.updateCard(updatedCard)
          .then(response => {
            const card = response.data
            this.$store.commit("updatePosition", card)
          })
          .catch(error => console.log(error))
      }
    }
  }
}
</script>