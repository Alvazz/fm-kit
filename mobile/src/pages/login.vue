<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>VUE7</f7-login-screen-title>
    <f7-block v-show="error">
      <p>{{error}}</p>
    </f7-block>
    <f7-list form>
      <f7-list-item>
        <f7-label>Username</f7-label>
        <f7-input type="text" placeholder="Your username" @input="form.username = $event.target.value"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Password</f7-label>
        <f7-input type="password" placeholder="Your password" @input="form.password = $event.target.value"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button @click="login">Sign In</f7-list-button>
      <f7-block-footer>Some text about login information.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f7-block-footer>
    </f7-list>
  </f7-page>
</template>
<script>
import {
  f7Page,
  f7LoginScreenTitle,
  f7List,
  f7ListItem,
  f7Label,
  f7Input,
  f7ListButton,
  f7BlockFooter
} from 'framework7-vue'

import API from '@/api'
import jwt_decode from 'jwt-decode'

export default {
  components: {
    f7Page,
    f7LoginScreenTitle,
    f7List,
    f7ListItem,
    f7Label,
    f7Input,
    f7ListButton,
    f7BlockFooter
  },
  data() {
    return {
      error: '',
      form: {
        username: 'luca',
        password: 'aalucabb'
      }
    }
  },
  methods: {
    login(evt) {
      evt.preventDefault()
      const self = this
      const app = self.$f7
      const router = self.$f7router
      API.post(`user/login`, this.form)
        .then(response => {
          console.log(this.$f7router)
          // JSON responses are automatically parsed.
          //this.$router.push('/')
          router.navigate('/home/')
          const decoded = jwt_decode(response.data.token)
          const role = decoded.role
          sessionStorage.setItem('token', response.data.token)
          this.$store.dispatch('updateToken', response.data.token)
          // this.$store.dispatch('setRole', role)
          // this.$acl.change(role)
        })
        .catch(e => {
          this.error = e.response.data.message
          console.log(e)
        })
    },
    signIn() {
      const self = this
      const app = self.$f7
      const router = self.$f7router
      app.dialog.alert(
        `Username: ${self.username}<br>Password: ${self.password}`,
        () => {
          router.back()
        }
      )
    }
  }
}
</script>
