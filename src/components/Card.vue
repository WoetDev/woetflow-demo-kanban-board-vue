<template>
    <q-card bordered class="cursor-move">
      <q-card-section>
        <div class="row items-center">
          <q-avatar>
            <img :src="card.user.value" :alt="card.title">
          </q-avatar>
          
          <span class="q-px-md col"><strong>{{ card.title }}</strong></span>
          <q-btn flat class="col-2" @click="onEdit(card)">
            <q-icon name="create" size="sm" color="primary" class="action-button" />
          </q-btn>
        </div> 

        <div class="row justify-center items-center">
          <span class="col text-italic q-pt-sm">
            {{ card.date | moment("MMM D") }}
          </span>
          <q-chip v-if="card.tag" :color="`${chipColor}-1`" :class="`text-${chipColor}-9 text-weight-medium`" >
            {{ card.tag }}
          </q-chip>
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    chipColor() {
      const mappings = {
        "Design": "purple",
        "Feature Request": "teal",
        "Backend": "blue",
        "QA": "green",
        'default': "teal"
      };
      return mappings[this.card.tag] || mappings.default;
    }
  },
  methods: {
    onEdit(card) {
      const cardProperties = {
        avatar: { label: card.user.label, value: card.user.value },
        status: { label: card.column.label, value: card.column.value },
        date: this.$moment(card.date).format("YYYY-MM-DD"),
        user_id: card.user.id,
        column_id: card.column.id
      }

      const cardEditor = Object.assign({}, card, cardProperties)

      this.$store.commit("setCardEditor", cardEditor)
      this.$store.commit("setManageCardDialog", true)
    }
  }
}
</script>