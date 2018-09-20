import { uuid } from 'vue-uuid'
const defaultState = {
  destinations: [],
  logs: []
}

const actions = {
  setDestinations: ({commit}, payload) => {
    commit('DESTINATIONS_SETTED', payload)
  },
  addDestination: ({commit}, payload) => {
    commit('DESTINATIONS_UPDATED', payload)
  },
  deleteDestination: ({commit}, payload)=> {
    console.log(payload)
    commit('DESTINATIONS_DELETED', payload)
  }
}

const mutations = {
  DESTINATIONS_SETTED: (state, payload) => {
    state.destinations = payload
  },
  DESTINATIONS_UPDATED: (state, payload) => {
    state.destinations.push(payload)
  },
  DESTINATIONS_DELETED: (state, payload) => {
    state.destinations = state.destinations.filter((el) => {
      return el._id !== payload
    })
  }
}

const getters = {
  getDestinations: state => {
    return state.destinations
  },
  currentDestination: (state) => (id) => {
    return state.destinations.filter((el)=>{
      return  el._id === id
    })
  },
  countDestinations: state => {
    return state.destinations.length
  }
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}
