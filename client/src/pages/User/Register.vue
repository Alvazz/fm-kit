<template>
  <div class="section">
    <div class="box">
      <h1 class="title">Register</h1>
      <div class="form-group">
        <label class="label">Username</label>
          <input class="form-control" type="text" v-model="form.username" placeholder="Username">
      </div>
      <div class="form-group">
        <label class="label">Email</label>
          <input class="form-control" type="email" v-model="form.email" placeholder="email">
      </div>
      <div class="form-group">
        <label class="label">Password</label>
        <div class="control">
          <input class="form-control" type="password" v-model="form.password" placeholder="password">
        </div>
      </div>
      <div class="form-group">
        <label class="radio">
          <input type="radio" value="admin" v-model="form.role" name="role" checked>
          Admin
        </label>
        <label class="radio">
          <input type="radio" value="user" v-model="form.role" name="role">
          User
        </label>
      </div>
      <div class="btn btn-primary" @click="register">
        Register
      </div>
    </div>
    <router-link to="/">
      Torna alla home
    </router-link>
  </div>
</template>

<script>

import API from '@/api'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'test',
        email: 'test@luca.it',
        password: '123',
        role: 'admin'
      }

    }
  },
  methods: {
    register (evt) {
      evt.preventDefault()
      API.post(`user/register`, this.form)
      .then(response => {
        if(response.status === 201) {
          console.log(this)
          this.$store.dispatch('setRole', this.form.role)
          // this.$acl.change(this.form.role)
          this.$router.push('/');
        }

      })
      .catch(e => {
        console.log(e)
      })
    },
    onClick(e){
      e.preventDefault();
      this.$router.push('/')
    }
  }
}
</script>
