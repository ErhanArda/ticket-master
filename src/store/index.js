import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    baseUrl: "https://app.ticketmaster.com/discovery/v2/",
    eventList: [],
    eventDetails: {},
    page: 0,
    total: 1,
    keyword:""
  },
  mutations: {
    setEventList(state, pEventList) {
      state.eventList = pEventList
    },
    setEventDetails(state, pEventDetails) {
      state.eventDetails = pEventDetails
    },
    setKeyword(state,pKeyword){
      state.keyword = pKeyword
    },
    setPage(state,pPage){
      state.page = pPage
    }
  },
  getters: {
    getEventList: state => state.eventList,
    getEventDetails(state) {
      return state.eventDetails;
    },
    getKeyword: state => state.keyword,
    getPage: state => state.page,

  },
  actions: {
    fetchEventList({ commit, state }, payload) {
      console.log('payload', payload)
      axios.get(`${state.baseUrl}events?apikey=c5E0azLbRMKOHm9fZpuBftGzEOIV2H9K&page=${state.page}&keyword=${payload}`)
        .then(response => {
          console.log('response.data!', response)
          commit("setEventList", response.data._embedded.events)
          commit("setKeyword", payload)
        }).catch(error => {
          console.log('error', error)
          alert("not found")
        })
    },
    prevEventList({ commit, state }, payload) {
      console.log('payload', payload)
      axios.get(`${state.baseUrl}events?apikey=c5E0azLbRMKOHm9fZpuBftGzEOIV2H9K&page=${payload}&keyword=${state.keyword}`)
        .then(response => {
          console.log('response.data!', response)
          commit("setEventList", response.data._embedded.events)
          commit("setPage", response.data.page)

        }).catch(error => {
          console.log('error', error)
          alert("not found")
        })
    },
    nextEventList({ commit, state }, payload) {
      console.log('payload', payload)
      axios.get(`${state.baseUrl}events?apikey=c5E0azLbRMKOHm9fZpuBftGzEOIV2H9K&page=${payload}&keyword=${state.keyword}`)
        .then(response => {
          console.log('response.data!', response)
          commit("setEventList", response.data._embedded.events)
          commit("setPage", response.data.page)

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
