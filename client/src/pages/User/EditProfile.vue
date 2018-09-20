<template>
  <div class="section">
    <h1 class="title">{{ $t('message.editProfile') }} </h1>
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input class="input" type="text" v-model="form.username" placeholder="Username">
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" v-model="form.email" placeholder="email">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" v-model="form.password" placeholder="password">
      </div>
    </div>
    <div class="field">
      <label class="radio">
        <input type="radio" value="admin" v-model="form.role" name="role" checked>
        Admin
      </label>
      <label class="radio">
        <input type="radio" value="user" v-model="form.role" name="role">
        User
      </label>
    </div>
    <div class="button is-primary" @click="editProfile">
      Save
    </div>
  </div>
</template>

<script>
import API from '@/api'
import jwt_decode from 'jwt-decode'

export default {
  name: 'UserList',
  data() {
    return {
      user: '',
      form: {}
    }
  },
  created() {
    API.get('user/' + this.$route.params.id, this.form)
      .then(response => {
        this.form = response.data
      })
      .catch(e => {
        console.log(e)
      })
  },
  computed: {
    isOwner() {
      return //this.$store.getters.getToken !== null && jwt_decode(this.$store.getters.getToken).userId === this.$route.params.id || this.$acl.check('isAdmin')
    }
  },
  methods: {
    editProfile() {
      const self = this
      const updateData = [
        { propName: 'username', value: this.form.username },
        { propName: 'email', value: this.form.email },
        { propName: 'role', value: this.form.role }
      ]
      API.patch('user/' + this.$route.params.id, updateData)
        .then(res => {
          console.log(res)
          console.log('Profile Updated')
          self.$router.go(-1)
        })
        .catch(function(error) {
          console.log(error.response.data.message)
          alert(error.response.data.message)
        })
    }
  }
}
</script>
