import Vue from 'vue'
import Vuex from 'vuex'
import itemsModule from './modules/items/index'
import usersModule from './modules/users/index'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    items: itemsModule,
    users: usersModule
  }
})

export default store
