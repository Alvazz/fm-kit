<template>
  <div class="row mt-5 mb-5 sidebar">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div v-show="$profile.isAllowed('isAdmin')">
        <p class="menu-label">
          Admin
        </p>
        <ul class="menu-list">
          <li>
            <a>Flashes</a>
            <ul>
              <li>
                <router-link :to="{name: 'adminFlashAdd'}">Add</router-link>
              </li>
              <li><router-link :to="{name: 'adminFlashesList'}">All</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="box">
        <router-link class="btn" to="/" @click.native="logout">
          Logout
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import profilePerimeter from '@/perimeters/profilePerimeter'

export default {
  data() {
    return {}
  },
  perimeters: [profilePerimeter],
  methods:{
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
