<template>
  <nav class="navbar is-light">
    <div class="navbar-brand">
      <div class="navbar-item" href="/">
        Vue Start Kit
      </div>
      <a class="navbar-burger" @click="open = !open">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{'is-active': open}">
      <div class="navbar-start">

        <div class="navbar-item">
          <router-link class="button is-primary" :to="{name: 'about'}" @click.native="open = false">
            About
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link class="button is-primary" to="/" @click.native="open = false">
            Posts
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link class="button is-primary" :to="{name: 'photos'}" @click.native="open = false">
            Photos
          </router-link>
        </div>
        <div class="navbar-item">
          <div class="button is-primary" @click="switchLocale">
            {{ displayLocale }}
          </div>
        </div>
      </div>

      <div class="navbar-end" v-if="isLogged">
        <div class="navbar-item">
          <figure class="image is-24x24">
            <img src="https://bulma.io/images/placeholders/24x24.png">
          </figure>
          <router-link class="is-link" :to="{ name: 'profile', params: { id: currentUser.userId }}" >{{currentUser.username}}</router-link>
          <small>({{currentUser.role}})</small>
        </div>
        <div class="navbar-item" >
          <router-link v-show="$profile.isAllowed('isAdmin')" class="button is-primary" to="/admin" >
            Admin
          </router-link>
        </div>
        <div class="navbar-item" >
          <router-link class="button is-primary" to="/" @click.native="logout">
            Logout
          </router-link>
        </div>
      </div>
      <div class="navbar-end" v-else>
        <div class="navbar-item" >
          <router-link class="button is-primary" to="/login">
            Login
          </router-link>
        </div>
      </div>
    </div>
  </nav>
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
    switchLocale() {
      this.open = false
      if (this.$i18n.locale === 'it') {
        this.$i18n.locale = 'en'
      } else {
        this.$i18n.locale = 'it'
      }
    },
    logout() {
      this.open = false
      this.$router.push('/')
      this.$store.dispatch('removeToken')
      // this.$acl.change('public')
    }
  }
}
</script>

<style lang="scss">
.navbar {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}
</style>
