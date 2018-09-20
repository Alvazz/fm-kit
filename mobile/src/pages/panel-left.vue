<template>
  <f7-page>
    <f7-navbar title="Left Panel"></f7-navbar>
    <f7-block strong>
      <p>Left panel content goes here</p>
    </f7-block>
    <f7-block-title v-if="isLogged">Load page in panel</f7-block-title>
    <f7-list v-if="isLogged">
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-item link="/stories/" title="Storie" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/search/" title="Search" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/about/" title="About" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/form/" title="Form" view="#main-view" panel-close></f7-list-item>
      <f7-list-item v-if="isLogged" link="/login/" @click="logout" title="Logout" view="#main-view" panel-close></f7-list-item>
      <f7-list-item v-else link="/login/" title="Login" view="#main-view" panel-close></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import jwt_decode from 'jwt-decode'
import profilePerimeter from '@/perimeters/profilePerimeter'
export default {
  data() {
    return {
      open: false,
      currentUser: sessionStorage.getItem('token')
        ? jwt_decode(sessionStorage.getItem('token'))
        : ''
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged
    },
    getCurrentUser() {
      return jwt_decode(sessionStorage.getItem('token'))
    },
    displayLocale() {
      let other = 'Traduci in Italiano'
      if (this.$i18n.locale === 'it') {
        other = 'Translate in English'
      }
      return other
    }
  },
  perimeters: [profilePerimeter],
  methods: {
    logout() {
      this.$store.dispatch('removeToken')
    }
  }
}
</script>
