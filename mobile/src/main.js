// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

// Import F7 Styles
import Framework7Styles from 'framework7/css/framework7.css'

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css'
import AppStyles from './css/app.css'

// Import App Component
import VueKindergarten from 'vue-kindergarten'
import App from './app'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt_decode from 'jwt-decode'
import Vuex from 'vuex'
import store from './store'

import * as VueGoogleMaps from 'vue2-google-maps'

import { messages, numberFormats, dateTimeFormats } from './lang'

import child from './child'

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

Vue.use(VueI18n)
Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.use(VueKindergarten, {
  child
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDOcrnBrrle34U60D06YXbTVOGsyNwtwfo',
    libraries: 'places,drawing,visualization'
    // v: '3.26',
  }
})

const i18n = new VueI18n({
  locale: 'en',
  messages,
  numberFormats,
  dateTimeFormats
})

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  i18n,
  store,
  // Register App Component
  components: {
    app: App
  }
})
