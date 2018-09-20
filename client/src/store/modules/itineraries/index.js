import { uuid } from 'vue-uuid'

const stepObj = {
  _id: uuid.v1(),
  title: 'New York Downtown',
  description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.',
  coords: {
    lat: 40.6971494,
    lng: -74.2598686
  }
}

const itineraryObj ={
  _id: '',
  type: '',
  slug: 'itinerario-nord-america',
  status: '',
  steps: [stepObj],
  geo: {
    name: 'New York Downtown',
    coords: {
      lat: 40.6971494,
      lng: -74.2598686
    }
  },
  title: 'Itinerario Nord America',
  subtitle: '',
  description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.',
  destinations: [],
  cover: '',
  createAt: new Date(),
  author: {
    _id: uuid.v1(),
    username: 'Maria Test'
  }
}
const defaultState = {
  itineraries: [],
  logs: []
}

const actions = {
  setItineraries: ({commit}, payload) => {
    commit('ITINERARIES_SETTED', payload)
  },
  addItinerary: ({commit}, payload) => {
    commit('ITINERARIES_UPDATED', payload)
  },
  deleteItinerary: ({commit}, payload)=> {
    console.log(payload)
    commit('ITINERARIES_DELETED', payload)
  }
}

const mutations = {
  ITINERARIES_SETTED: (state, payload) => {
    state.itineraries = payload
  },
  ITINERARIES_UPDATED: (state, payload) => {
    state.itineraries.push(payload)
  },
  ITINERARIES_DELETED: (state, payload) => {
    state.itineraries = state.itineraries.filter((el) => {
      return el._id !== payload
    })
  }
}

const getters = {
  getItineraries: state => {
    return state.itineraries
  },
  currentItinerary: (state) => (id) => {
    return state.itineraries.filter((el)=>{
      return  el._id === id
    })
  },
  countItineraries: state => {
    return state.itineraries.length
  }
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}
