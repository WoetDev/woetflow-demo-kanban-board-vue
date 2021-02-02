import axios from 'axios'

const API_URL = process.env.API_URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

export default {
  getColumns() {
    return axiosInstance.get("/columns")
  },
  getUsers() {
    return axiosInstance.get("/users")
  },
  getCards() {
    return axiosInstance.get("/cards")
  },
  createCard(card) {
    return axiosInstance.post("/cards", card)
  },
  updateCard(card) {
    return axiosInstance.patch(`/cards/${card.id}`, card)
  },
  deleteCard(id) {
    return axiosInstance.delete(`/cards/${id}`)
  }
}