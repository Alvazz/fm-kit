<template>
  <section>
    <div class="row align-items-center content--home content--height">
      <div class="col-lg-6 col-md-6 col-sm-12 content--hotel ">
        <router-link :to="{ name: 'hotels'}">
          <div>
            <h1>Hotel</h1>
            <p>Scopri gli hotel più prestigiosi</p>
          </div>
        </router-link>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 content--itinerari">
        <router-link :to="{ name: 'itineraries'}">
          <div>
            <h1>Itinerari</h1>
            <p>Percorri gli itinerari più esclusivi</p>
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
.content--hotel {
	background: linear-gradient(rgba(50, 50 ,50, .4), rgba(97, 98 ,116 , .4)), url("../assets/Itinerario/lasvegas.jpg") no-repeat;
		background-size:cover;
	text-align: center;
	height: 100%;
}

.content--hotel h1, .content--itinerari h1, .content--hotel p, .content--itinerari p {color:white;}
.content--itinerari {
	background:  linear-gradient(rgba(50, 50 ,50, .4), rgba(97, 98 ,116 , .4)), url("../assets/Itinerario/california.jpg") no-repeat;
	background-size:cover;
	text-align: center;
	height: 100%;
	-webkit-transition: linear-gradient 3s; /* Safari */
    transition: linear-gradient 3s;
}
.content--itinerari:hover{
	background:  linear-gradient(rgba(97, 98 ,116 , .1), rgba(97, 98 ,116 , .1)), url("../assets/Itinerario/california.jpg") no-repeat;
		background-size:cover;
}
.content--hotel:hover {
	background:  linear-gradient(rgba(97, 98 ,116 , .1), rgba(97, 98 ,116 , .1)), url("../assets/Itinerario/lasvegas.jpg") no-repeat;
		background-size:cover;
}
.content--itinerari div, .content--hotel div {
	vertical-align: middle;
	display: inline-block;
	position: relative;
	top: 40%;
	margin: auto;
}
</style>
