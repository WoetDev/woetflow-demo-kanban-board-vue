<template>
  <q-page>
    <div class="flex justify-center">
      <div class="text-h4 text-primary q-py-md"><b>Kanban board</b></div>
    </div>

    <div class="flex justify-center">
      <Column v-for="column in columns" :key="column.id" :column="column" :cards="column.cards"  />
    </div>    
    
  </q-page>
</template>

<script>
import Column from '../components/Column'

export default {
  name: 'PageIndex',
  data: () => ({
    columns: [
      {
        id: 1,
        label: "TO-DO",
        value: "to_do",
        created_at: "2021-01-26T22:39:27.001Z",
        updated_at: "2021-01-26T22:39:27.001Z",
        cards: []
      },
      {
        id: 2,
        label: "IN PROGRESS",
        value: "in_progress",
        created_at: "2021-01-26T22:39:27.020Z",
        updated_at: "2021-01-26T22:39:27.020Z",
        cards: [
          {
            id: 38,
            title: "Add steppers to order process",
            date: "2021-02-24T00:00:00.000Z",
            tag: "Backend",
            created_at: "2021-01-28T22:38:09.601Z",
            updated_at: "2021-01-29T10:05:56.538Z",
            user: {
                id: 4,
                label: "Vincent Chase",
                value: "https://pickaface.net/gallery/avatar/Opi51c74f6c56e40.png",
                created_at: "2021-01-26T22:39:27.067Z",
                updated_at: "2021-01-26T22:39:27.067Z"
            },
            column: {
                id: 2,
                label: "IN PROGRESS",
                value: "in_progress",
                created_at: "2021-01-26T22:39:27.020Z",
                updated_at: "2021-01-26T22:39:27.020Z"
            }
          },
          {
            id: 18,
            title: "Design shopping cart dropdown",
            date: "2021-01-09T00:00:00.000Z",
            tag: "Design",
            created_at: "2021-01-27T17:36:23.744Z",
            updated_at: "2021-01-29T10:06:38.726Z",
            user: {
                id: 1,
                label: "Steve Jobs",
                value: "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png",
                created_at: "2021-01-26T22:39:27.046Z",
                updated_at: "2021-01-26T22:39:27.046Z"
            },
            column: {
                id: 2,
                label: "IN PROGRESS",
                value: "in_progress",
                created_at: "2021-01-26T22:39:27.020Z",
                updated_at: "2021-01-26T22:39:27.020Z"
            }
          }
        ]
      },
      {
        id: 3,
        label: "REVIEW",
        value: "review",
        created_at: "2021-01-26T22:39:27.026Z",
        updated_at: "2021-01-26T22:39:27.026Z",
        cards: []
      },
      {
        id: 4,
        label: "DONE",
        value: "done",
        created_at: "2021-01-26T22:39:27.031Z",
        updated_at: "2021-01-26T22:39:27.031Z",
        cards: [
          {
            id: 21,
            title: "Add paypal as a payment provider",
            date: "2021-01-14T00:00:00.000Z",
            tag: "Feature Request",
            created_at: "2021-01-27T17:36:23.776Z",
            updated_at: "2021-01-29T10:06:26.413Z",
            user: {
                id: 4,
                label: "Vincent Chase",
                value: "https://pickaface.net/gallery/avatar/Opi51c74f6c56e40.png",
                created_at: "2021-01-26T22:39:27.067Z",
                updated_at: "2021-01-26T22:39:27.067Z"
            },
            column: {
                id: 4,
                label: "DONE",
                value: "done",
                created_at: "2021-01-26T22:39:27.031Z",
                updated_at: "2021-01-26T22:39:27.031Z"
            }
          }
        ]
      }
    ]
  }),
  components: {
    Column
  }
}
</script>
