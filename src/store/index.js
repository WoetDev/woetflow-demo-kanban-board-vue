import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    state: {
      columns: [],
      users: [],
      cardEditor: {},
      manageCardDialog: false
    },
    getters: {},
    mutations: {
      setColumns(state, columns) {
        state.columns = columns
      },
      updateColumns(state, { column_id, cards }) {
        let column = state.columns.find(column => column.id === column_id)
        column.cards = cards
      },
      setUsers(state, users) {
        state.users = users
      },
      setManageCardDialog(state, manageCardDialog) {
        state.manageCardDialog = manageCardDialog
      },
      setCardEditor(state, card) {
        state.cardEditor = Object.assign({}, state.cardEditor, card);
        state.manageCardDialog = true
      },
      clearCardEditor(state) {
        state.cardEditor = {}
      },
      addCard(state, card) {
        state.columns.find(column => column.id === card.column.id).cards.push(card)
      },
      updateCard(state, card) {
        state.columns.map(column => {
          let cards = column.cards
          let updatedCard = column.id === card.column.id ? card : null
          let cardIndex = cards.findIndex(i_card => i_card.id === card.id) > -1 ? cards.findIndex(i_card => i_card.id === card.id) : cards.length
          updatedCard ? cards.splice(cardIndex, 1, card) : cards.splice(cardIndex, 1)
        })        
      },
      removeCard(state, card)  {
        let column = state.columns.find(column => column.id === card.column.id)
        let cards = column.cards
        cards.splice(cards.findIndex(i_card => i_card.id === card.id), 1)
      },
      updatePosition(state, updatedCard) {
        let updatedColumn = state.columns.find(i_column => i_column.id === updatedCard.column.id)
        let cardIndex = updatedColumn.cards.findIndex(i_card => i_card.id === updatedCard.id)
        updatedColumn.cards.splice(cardIndex, 1, updatedCard)
      }
    },
    actions: {},
    modules: {},

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
