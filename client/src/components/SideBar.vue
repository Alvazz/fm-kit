<template>
  <div class="row mt-5 mb-5 sidebar">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div>
        <p class="menu-label">
          Admin
        </p>
        <ul class="menu-list">
          <li>
            <a>Hotels</a>
            <ul>
              <li>
                <router-link :to="{name: 'adminHotelAdd'}">Add</router-link>
              </li>
              <li><router-link :to="{name: 'adminHotelsList'}">All</router-link></li>
            </ul>
          </li>
          <li>
            <a>Itinerari</a>
            <ul>
              <li>
                <router-link :to="{name: 'adminItineraryAdd'}">Add</router-link>
              </li>
              <li><router-link :to="{name: 'adminItinerariesList'}">All</router-link></li>
            </ul>
          </li>
          <li>
            <a>Destinazioni</a>
            <ul>
              <li>
                <router-link :to="{name: 'adminDestionationAdd'}">Add</router-link>
              </li>
              <li><router-link :to="{name: 'adminDestinationsList'}">All</router-link></li>
            </ul>
          </li>
          <li>
            <a>Media</a>
            <ul>
              <li><router-link :to="{name: 'adminMediaList'}">All</router-link></li>
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
