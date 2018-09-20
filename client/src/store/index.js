import Vue from 'vue'
import Vuex from 'vuex'
import itemsModule from './modules/items/index'
import usersModule from './modules/users/index'
import hotelssModule from './modules/hotels/index'
import itinerariesModule from './modules/itineraries/index'
import destinationsModule from './modules/destinations/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    items: itemsModule,
    users: usersModule,
    hotels: hotelssModule,
    itineraries: itinerariesModule,
    destinations: destinationsModule
  }
})

export default store
