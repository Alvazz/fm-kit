import { uuid } from 'vue-uuid'
const defaultState = {
  hotels: [],
  logs: []
}

  const actions = {
    setHotels: ({commit}, payload) => {
      commit('HOTELS_SETTED', payload)
    },
    addHotel: ({commit}, payload) => {
      commit('HOTELS_UPDATED', payload)
    },
    deleteHotel: ({commit}, payload)=> {
      console.log(payload)
      commit('HOTELS_DELETED', payload)
    }
  }

  const mutations = {
    HOTELS_SETTED: (state, payload) => {
      state.hotels = payload
    },
    HOTELS_UPDATED: (state, payload) => {
      state.hotels.push(payload)
    },
    HOTELS_DELETED: (state, payload) => {
      state.hotels = state.hotels.filter((el) => {
        return el._id !== payload
      })
    }
  }

  const getters = {
    getHotels: state => {
      return state.hotels
    },
    currentHotel: (state) => (id) => {
      return state.hotels.filter((el)=>{
        return  el._id === id
      })
    },
    countHotels: state => {
      return state.hotels.length
    }
  }

  export default {
    state: defaultState,
    getters,
    actions,
    mutations
  }
