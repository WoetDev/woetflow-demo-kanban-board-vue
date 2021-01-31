<template>
  <div>
    <q-btn label="New task" color="primary" icon="add" outline @click="onCreate" />

    <q-dialog
      v-model="manageCardDialog"
    >
      <q-card style="width: 700px; max-width: 80vw;" class="q-pa-lg">
        <q-card-section>
          <div class="text-h6 q-pb-md">
            <span v-if="cardEditor.id">UPDATE</span>
            <span v-else>CREATE</span>
            TASK
          </div>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >

            <q-input
              outlined
              v-model="title"
              label="Task description *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            
            <q-select outlined v-model="avatar" :options="users" label="User *" @filter="showUsers" lazy-rules
              :rules="[ val => val || 'Please select someone']">
              
              <template v-slot:before>
                <q-avatar>
                  <img :src="avatar != null ? avatar.value : 'https://pickaface.net/gallery/avatar/unr_julande_210111_1628_32cw8.png'">
                </q-avatar>
              </template>

              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select outlined v-model="status" :options="columns" label="Status *" lazy-rules
              :rules="[ val => val || 'Please select something']" />

            <q-input
              type="date"
              outlined
              v-model="date"
              :stack-label="true"
              label="Date *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please choose a date']"
            />

            <q-select label="Tag" outlined v-model="tag" :options="tags"></q-select>

            <q-card-actions class="flex">
              <div class="col">
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" class="q-ml-sm" flat />
                <q-btn label="Cancel" color="negative" flat v-close-popup="manageCardDialog" />
              </div>
              <q-btn v-if="cardEditor.id" label="Delete" color="negative" @click="onDelete(cardEditor)" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex"
import api from "../api"

export default {
  name: "ManageCard",
  data: () => ({
    tags: ["Design","Feature Request", "Backend", "QA"]
  }),
  computed: {
    columns() {
      return this.$store.state.columns
    },
    users: {
      set(users) {
        this.$store.commit("setUsers", users)
      },
      get() {
         return this.$store.state.users
      }
    },
    manageCardDialog: {
      set(manageCardDialog) {
        this.$store.commit("setManageCardDialog", manageCardDialog)
      },
      get() {
        return this.$store.state.manageCardDialog
      }
    },
    ...mapState(["cardEditor"]),
    id: {
      get() {
        return this.cardEditor.id
      }
    },
    title: {
      set(title) {
        this.$store.commit("setCardEditor", { title });
      },
      get() {
        return this.cardEditor.title
      }
    },
    avatar: {
      set(avatar) {
        this.$store.commit("setCardEditor", { avatar });
      },
      get() {
        return this.cardEditor.avatar
      }
    },
    status: {
      set(status) {
        this.$store.commit("setCardEditor", { status });
      },
      get() {
        return this.cardEditor.status
      }
    },
    date: {
      set(date) {
        this.$store.commit("setCardEditor", { date });
      },
      get() {
        return this.cardEditor.date
      }
    },
    tag: {
      set(tag) {
        this.$store.commit("setCardEditor", { tag });
      },
      get() {
        return this.cardEditor.tag
      }
    }
  },
  methods: {
    showUsers(val, update, abort) {
      if(this.users && this.users.length === 0) {
        api.getUsers()
          .then(response => {
            const users = response.data
            update(() => {
              this.users = users
            })
          })
          .catch(error => console.log(error))
      } 
      else {
        update()
        return
      }
    },
    onReset () {
      this.title = null
      this.avatar = null
      this.status = null
      this.date = null
      this.tag = null
    },
    onSubmit() {
      if(this.cardEditor.id == null) {
        const card = {
          title: this.title,
          date: this.date,
          tag: this.tag,
          column_id: this.status.id,
          user_id: this.avatar.id
        }

        api.createCard(card)
          .then(response => {
            this.$store.commit("addCard", response.data);
            this.$store.commit("clearCardEditor")
          })
          .catch(error => console.log(error))
      }
      
      else {
        const card = {
          id: this.id,
          title: this.title,
          date: this.date,
          tag: this.tag,
          column_id: this.status.id,
          user_id: this.avatar.id
        }

        api.updateCard(card)
          .then(response => {
            this.$store.commit("updateCard", response.data);
            this.$store.commit("clearCardEditor")
          })
          .catch(error => console.log(error))
      }
  
      this.$store.commit("setManageCardDialog", false)
    },
    onCreate() {
      this.$store.commit("clearCardEditor")
      this.$store.commit("setManageCardDialog", true)
    },
    onDelete(card) {
      api.deleteCard(card.id)
        .then(
          this.$store.commit("setManageCardDialog", false),
          this.$store.commit("removeCard", card)
        )
        .catch(error => console.log(error))
    } 
  }
}
</script>