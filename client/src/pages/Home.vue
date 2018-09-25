<template>
  <section>
    <div class="row align-items-center content--home content--height">
      <div class="col-lg-12 col-md-6 col-sm-12">
        <router-link :to="{ name: 'hotels'}">
          <div>
            intem
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import API from '@/api'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      loading: false,
    }
  },
  created() {
    API.get('destinations')
    .then(response => {
      console.log(response)
      this.$store.dispatch('setDestinations',response.data.set)
    })
    .catch(e => {
      console.log(e)
    })
    API.get('hotels')
    .then(response => {
      console.log(response)
      this.$store.dispatch('setHotels',response.data.set)
    })
    .catch(e => {
      console.log(e)
    })
    API.get('itineraries')
    .then(response => {
      console.log(response)
      this.$store.dispatch('setItineraries',response.data.set)
    })
    .catch(e => {
      console.log(e)
    })
  },
  computed: {
  },
  methods: {
    switchLocale() {
      if (this.$i18n.locale === 'it') {
        this.$i18n.locale = 'en'
      } else {
        this.$i18n.locale = 'it'
      }
    }
  }
}
</script>

<style scoped>
.content {
	top: 10vh;

	position: relative;
}
.content--height {
	height: 90vh;
}
.content--home a {
	color: rgba(0, 0, 34 ,1);
}
</style>
