<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>My App</f7-nav-title>
      <f7-nav-right>
        <f7-link v-show="$profile.isAllowed('isAdmin')" icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar v-if="isLogged">
      <f7-link></f7-link>
      <f7-link popover-open=".popover-menu">
        <div class="icon-chart">{{getFiestChart}}</div>
      </f7-link>
      <f7-popover class="popover-menu">
        <f7-list>
          <f7-list-item link="/about/" popover-close title="About"></f7-list-item>
          <f7-list-item link="/form/" popover-close title="Form"></f7-list-item>
          <f7-list-item link="/calendar-page/" popover-close title="Calendar"></f7-list-item>
          <f7-list-item v-show="$profile.isAllowed('isAdmin')" link="#" popover-close title="Admin"></f7-list-item>
        </f7-list>
      </f7-popover>
    </f7-toolbar>
    <f7-block strong>
      <p>{{ $t('message.hello') }}</p>
    </f7-block>
    <f7-block-title>Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>
    <f7-block-title v-if="isLogged">Modals</f7-block-title>
    <f7-block strong v-if="isLogged">
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised popup-open="#popup">Popup</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised login-screen-open="#login-screen">Login Screen</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-list>
      <f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import jwt_decode from 'jwt-decode'
import profilePerimeter from '@/perimeters/profilePerimeter'
export default {
  data() {
    return {
      users: [{ id: '5b3d2dbae4448205b8263054', name: 'Mario' }]
    }
  },
  perimeters: [profilePerimeter],
  computed: {
    isLogged() {
      return this.$store.getters.isLogged
    },
    getFiestChart() {
      const user = jwt_decode(sessionStorage.getItem('token')).username
      return user.charAt(0)
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
  methods: {
    logout() {
      this.$store.dispatch('removeToken')
    }
  }
}
</script>

<style scoped>
.icon-chart {
  height: 30px;
  width: 30px;
  text-align: center;
  border: 1px solid;
  border-radius: 50%;
  line-height: 30px;
  font-weight: bold;
  text-transform: capitalize;
}

/** **/

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.4s, -webkit-transform 0.4s;
  transition: opacity 0.4s, transform 0.4s;
  transition: opacity 0.4s, transform 0.4s, -webkit-transform 0.4s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  -webkit-transform: translateY(12px);
  transform: translateY(12px);
}
</style>
