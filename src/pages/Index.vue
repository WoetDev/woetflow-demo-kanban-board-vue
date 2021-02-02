<template>
  <q-page>
      <div class="flex justify-center">
        <div class="text-h4 text-primary q-py-md"><b>Kanban board</b></div>
      </div>

      <div class="flex justify-center">
        <ManageCard />
      </div>

      <div v-if="isLoading" class="flex justify-center q-pt-xl">
        <q-spinner
          color="primary"
          size="3em"
        />
      </div>

      <div v-else class="flex justify-center">
        <Column v-for="column in columns" :key="column.id" :column="column"  />
      </div>
  </q-page>
</template>

<script>
import api from '../api'
import Column from '../components/Column'
import ManageCard from '../components/ManageCard'

export default {
  name: 'PageIndex',
  data: () => ({
    isLoading: true
  }),
  components: {
    Column,
    ManageCard
  },
  computed: {
    columns: {
      get() {
        return this.$store.state.columns
      }
    }
  },
  created() {
    api.getColumns()
      .then(response => {
        this.isLoading = false
        this.$store.commit("setColumns", response.data)
      })
      .catch(error => console.log(error))
  }
}
</script>
