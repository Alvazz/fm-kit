<template>
  <div>
    <b-navbar toggleable="md">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand>
        <router-link to="/" >
          <!--<img src="@/assets/logo.png" width="auto" height="30" class="d-inline-block align-top" alt="">-->
        </router-link>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" >Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contatti" >Contatti</router-link>
          </li>
          <b-nav-form v-show="false">
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button class="search-submit" type="submit"><i class="fas fa-search fa-lg"></i></b-button>
          </b-nav-form>
          <b-nav-item-dropdown right v-if="$profile.isAllowed('isAdmin')" >
            <template slot="button-content">
              <em>Admin</em>
            </template>
            <b-dropdown-item href="#">
              <router-link class="navbar-item" to="/admin" >
                Dashboard
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link class="navbar-item" to="/" @click.native="logout">
                Logout
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else>
            <router-link to="/login">
              Login
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- navbar-1.vue -->
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
import profilePerimeter from '@/perimeters/profilePerimeter'
// import TheLanguageSwitcher from '@/components/TheLanguageSwitcher'
import * as Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from '@/defineSteps'
import Avatar from 'vue-avatar'
import AvatarRow from '@/components/AvatarRow'

export default {
  data() {
    return {
      driver: null,
      steps: [
        {
          element: '.menu-start-container',
          popover: {
            title: 'Nav',
            description: 'Open && Close sidebar',
            position: 'bottom'
          }
        },
        {
          element: '.menu-end-container',
          popover: {
            title: 'Admin',
            description: 'Open && Close sidebar',
            position: 'bottom'
          }
        },
        {
          element: '.sidebar-container',
          popover: {
            title: 'Sidebar',
            description: 'Open && Close sidebar',
            position: 'left'
          }
        }
      ],
      open: false,
      currentUser: sessionStorage.getItem('token')
      ? jwt_decode(sessionStorage.getItem('token'))
      : ''
    }
  },
  components: {
    // TheLanguageSwitcher,
    Avatar,
    AvatarRow
  },
  mounted() {
    this.driver = new Driver()
    this.driver.defineSteps(this.steps)
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
    startGuide() {
      this.driver.start()
    },
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
      document.location.href = "/"
      this.$store.dispatch('removeToken')
      // this.$acl.change('public')
    }
  }
}
</script>

<style lang="scss">
.navbar {
  height: 10vh;
  color: #c2c2c2;
  border-bottom: 1px solid #c2c2c2;
  //background-color: rgba(	24, 27, 47 ,1);
}
.navbar-brand{z-index: 1040;}
.navbar-toggler{z-index: 1030;}
.navbar-nav{margin-left:auto;}
.menu-item, a.nav-link, .navbar button, .navbar input {
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  font-size: 0.8em;
  color: rgba(	24, 27, 47 ,1);
}
.menu-item a {
  color: rgba(	24, 27, 47 ,1);
  margin: 1em;
}
.menu-item a:hover {
  color: rgba(255,255,255, 0.7);
  text-decoration: none;
}
.custom-logo {
  height: 30px;
  width: auto;
}
</style>
