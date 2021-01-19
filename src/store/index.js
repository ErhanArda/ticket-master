import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    baseUrl: "https://app.ticketmaster.com/discovery/v2/",
    eventList: [],
    eventDetails: {},
    page: 1,
    total: 1
  },
  mutations: {
    setEventList(state, pEventList) {
      state.eventList = pEventList
    },
    setEventDetails(state, pEventDetails) {
      state.eventDetails = pEventDetails
    }
  },
  getters: {
    getEventList: state => state.eventList,
    getEventDetails(state) {
      return state.eventDetails;
    },
  },
  actions: {
    fetchEventList({ commit, state }, payload) {
      console.log('payload', payload)
      axios.get(`${state.baseUrl}events?apikey=c5E0azLbRMKOHm9fZpuBftGzEOIV2H9K&page=${state.page}&keyword=${payload}`)
        .then(response => {
          console.log('response.data!', response)
          commit("setEventList", response.data._embedded.events)
        }).catch(error => {
          console.log('error', error)
          alert("not found")
        })
    },
    loadEventDetails({ commit, state }, payload) {
      console.log('loadEventDetails', payload)
      axios.get(`${state.baseUrl}events/${payload}?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&locale=*`)
        .then(response => {
          console.log('response.data', response.data)
          commit("setEventDetails", response.data)
        })
    }
  },
  modules: {
  }
})
