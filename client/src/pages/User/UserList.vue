<template>
  <div class="section">
    <h1>User list</h1>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <router-link :to="{name: 'profile', params: { id: user._id } }">
          {{user.username}} [{{user.role}}]
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import API from '@/api'

export default {
  name: 'UserList',
  data() {
    return {
      users: ''
    }
  },
  created() {
    API.get('user/user-list')
      .then(response => {
        // JSON responses are automatically parsed.
        this.users = response.data
      })
      .catch(e => {
        console.log(e)
      })
  },
  computed: {}
}
</script>
