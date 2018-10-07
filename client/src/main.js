import Vue from 'vue'
// import acl from './acl'
import VueKindergarten from 'vue-kindergarten'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt_decode from 'jwt-decode'
import Vuex from 'vuex'
import store from './store'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { VueElevator } from 'vue-elevator'
import VuePaginate from 'vue-paginate'

import VueFormly from 'vue-formly'
import VueFormlyBootstrap from 'vue-formly-bootstrap'


import * as VueGoogleMaps from 'vue2-google-maps'

import { messages, numberFormats, dateTimeFormats } from './lang'

import Default from './layouts/Default.vue'
import Single from './layouts/Single.vue'
import Full from './layouts/Full.vue'
import Blank from './layouts/Blank.vue'

import child from './child'

import VueCarousel from 'vue-carousel'

import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

// import 'bulma/css/bulma.css'

// import 'bulma-steps/dist/css/bulma-steps.min.css'

import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'
import InlineEditor from '@ckeditor/ckeditor5-build-inline'
import VueCkeditor from 'vue-ckeditor5'

import moment from 'vue-moment-filter'

import googleAutocomplete from './components/fields/googleAutocomplete.vue'
import mediaUpload from './components/fields/mediaUpload.vue'
import steps from './components/fields/steps.vue'
import file from './components/fields/file.vue'

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

Vue.use(moment, 'en') // lang

Vue.use(VueCarousel)

Vue.use(flatPickr)

Vue.use(BootstrapVue)

Vue.use(VueKindergarten, {
  child
})

Vue.use(VueVideoPlayer)

Vue.component('VueElevator', VueElevator)

Vue.use(VuePaginate)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDOcrnBrrle34U60D06YXbTVOGsyNwtwfo',
    libraries: 'places,drawing,visualization'
    // v: '3.26',
  }
})

Vue.use(VCalendar, {
  firstDayOfWeek: 2
});

Vue.use(VueFormly)
Vue.use(VueFormlyBootstrap)

VueFormly.addType('google-autocomplete-with-field', googleAutocomplete)
VueFormly.addType('mediaUpload-with-field', mediaUpload)
VueFormly.addType('steps-with-field', steps)
VueFormly.addType('file-with-field', file)
// VueFormly.addType('google-autocomplete-with-field', googleAutocomplete)

Vue.use(VueI18n)
Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.use(VueCkeditor.plugin, {
  editors: {
    classic: ClassicEditor,
    balloon: BalloonEditor,
    inline: InlineEditor
  },
  name: 'ckeditor'
})

Vue.component('default-layout', Default)
Vue.component('single-layout', Single)
Vue.component('full-layout', Full)
Vue.component('blank-layout', Blank)

Vue.config.productionTip = false

import { i18n } from '@/plugins/i18n'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
