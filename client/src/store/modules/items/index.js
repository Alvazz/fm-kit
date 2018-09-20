
const defaultState = {
  items: [],
  logs: []
}

const actions = {
  setItems: ({commit}, payload) => {
    commit('ITEMS_SETTED', payload)
  },
  addItem: ({commit}, payload) => {
    commit('ITEMS_UPDATED', payload)
  },
  deleteItem: ({commit}, payload)=> {
    console.log(payload)
    commit('ITEMS_DELETED', payload)
  }
}

const mutations = {
  ITEMS_SETTED: (state, payload) => {
    state.items = payload
  },
  ITEMS_UPDATED: (state, payload) => {
    state.items.push(payload)
  },
  ITEMS_DELETED: (state, payload) => {
    state.items = state.items.filter((el) => {
      return el._id !== payload
    })
  }
}

const getters = {
  getItems: state => {
    return state.items
  },
  currentItem: (state) => (id) => {
    return state.items.filter((el)=>{
      return  el._id === id
    })
  },
  getItemByUser: (state) => (id) => {
    return state.items.filter((el)=>{
      return  el.author._id === id
    })
  },
  countItems: state => {
    return state.items.length
  }
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}
