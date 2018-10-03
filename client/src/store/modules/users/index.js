import jwt_decode from 'jwt-decode'

const defaultState = {
  jwt: sessionStorage.getItem('token'),
  isLogged: sessionStorage.getItem('token') ? true : false
}

const actions = {
  setRole: ({ commit }, payload) => {
    commit('SET_ROLE', payload)
  },
  updateToken ({ commit }, payload) {
    commit('UPDATE_TOKEN', payload)
    commit('SET_ISLOGGED')
  },
  obtainToken(username, password) {
    const payload = {
      username: username,
      password: password
    }
    axios
      .post(this.state.endpoints.obtainJWT, payload)
      .then(response => {
        this.commit('UPDATE_TOKEN', response.data.token)
      })
      .catch(error => {
        console.log(error)
      })
  },
  refreshToken() {
    const payload = {
      token: this.state.jwt
    }
    axios
      .post(this.state.endpoints.refreshJWT, payload)
      .then(response => {
        this.commit('UPDATE_TOKEN', response.data.token)
      })
      .catch(error => {
        console.log(error)
      })
  },
  inspectToken() {
    const token = this.state.jwt
    if (token) {
      const decoded = jwt_decode(token)
      const exp = decoded.exp
      const orig_iat = decoded.orig_iat
      if (
        exp - Date.now() / 1000 < 1800 &&
        Date.now() / 1000 - orig_iat < 628200
      ) {
        this.dispatch('refreshToken')
      } else if (exp - Date.now() / 1000 < 1800) {
        // DO NOTHING, DO NOT REFRESH
      } else {
        // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
      }
    }
  },
  removeToken({ commit }) {
    commit('REMOVE_TOKEN')
    commit('SET_ISLOGGED')
  }
}

const mutations = {
  SET_ROLE: (state, payload) => {
    state.role = payload
  },
  SET_ISLOGGED: (state) => {
    state.isLogged = !state.isLogged
  },
  UPDATE_TOKEN(state, newToken) {
    sessionStorage.setItem('token', newToken)
    state.jwt = newToken
  },
  REMOVE_TOKEN(state) {
    sessionStorage.removeItem('owner')
    state.role = 'public'
    state.jwt = null
  }
}

const getters = {
  isLogged: state => {
    return state.isLogged
  },
  getRole: state => {
    return state.role
  },
  getToken: state => {
    return state.jwt
  }
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}
