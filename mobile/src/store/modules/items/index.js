
const defaultState = {
  items: [1],
  logs: []
}

const actions = {
  addItem: ({commit}, payload) => {
    commit('ITEMS_UPDATED', payload)
  }
}

const mutations = {
  ITEMS_UPDATED: (state, payload) => {
    state.items.push(payload)
  }
}

const getters = {
  getItems: state => {
    return state.items
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
