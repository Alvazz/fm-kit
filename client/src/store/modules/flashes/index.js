import { uuid } from 'vue-uuid'
const defaultState = {
  flashes: [],
  logs: []
}

  const actions = {
    setHotels: ({commit}, payload) => {
      commit('FLASHES_SETTED', payload)
    },
    addHotel: ({commit}, payload) => {
      commit('FLASHES_UPDATED', payload)
    },
    deleteHotel: ({commit}, payload)=> {
      console.log(payload)
      commit('FLASHES_DELETED', payload)
    }
  }

  const mutations = {
    FLASHES_SETTED: (state, payload) => {
      state.flashes = payload
    },
    FLASHES_UPDATED: (state, payload) => {
      state.flashes.push(payload)
    },
    FLASHES_DELETED: (state, payload) => {
      state.hotels = state.flashes.filter((el) => {
        return el._id !== payload
      })
    }
  }

  const getters = {
    getFlashes: state => {
      return state.flashes
    },
    currentFlash: (state) => (id) => {
      return state.flashes.filter((el)=>{
        return  el._id === id
      })
    },
    countFlash: state => {
      return state.flashes.length
    }
  }

  export default {
    state: defaultState,
    getters,
    actions,
    mutations
  }
