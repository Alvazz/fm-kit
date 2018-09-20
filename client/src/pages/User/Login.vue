<template>
  <div class="row mt-5 mb-5">
    <div class="col-lg-12 col-md-12 col-sm-12">
    <div class="box">
      <h1 class="title">Login</h1>
      <div class="form-group">
        <label class="label">Username</label>
        <div class="control">
          <input class="form-control" type="text" v-model="form.username" placeholder="Username">
        </div>
      </div>
      <div class="form-group">
        <label class="label">Password</label>
        <div class="control">
          <input class="form-control" type="password" v-model="form.password" placeholder="password">
        </div>
      </div>
      <div class="btn btn-primary" @click="login">
        Login
      </div>
    </div>
    <router-link to="/">
      Torna alla home
    </router-link>
    <router-link to="/register">
      Rigistrazione
    </router-link>
  </div>
</div>
</template>

<script>
import API from '@/api'
import jwt_decode from 'jwt-decode'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'test',
        password: '123'
      }
    }
  },
  methods: {
    login (evt) {
      evt.preventDefault()
      // this.$router.push('/home')
      API.post(`user/login`, this.form)
      .then(response => {
        // JSON responses are automatically parsed.
        this.$router.push('/');
        const decoded = jwt_decode(response.data.token)
        const role = decoded.role
        sessionStorage.setItem('token',response.data.token);
        this.$store.dispatch('updateToken', response.data.token)
        // this.$store.dispatch('setRole', role)
        // this.$acl.change(role)
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
