<template>
  <div class="row mt-5 mb-5 pageview_">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sx-12 input--hotel">
          <div class="input-group ">
            <div class="input-group-prepend">
              <span class="input-group-text" id="hotel-destination"><i class="fas fa-map-marker-alt fa-lg"></i></span>
            </div>
            <input type="text" class="form-control" v-model="search" placeholder="Cerca per destinazione" aria-label="cerca per destinazione" aria-describedby="hotel-destination">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sx-12 input--hotel mt-4">
          <paginate-links class="justify-content-end" for="itineraries" :show-step-links="true"></paginate-links>
        </div>
      </div>
      <paginate class="row card-group " name="itineraries" :list="getItineraries" :per="4">
        <div class="col-lg-6 col-md-6 col-sm-12 mb-5" v-for="itinerary in paginated('itineraries')">
          <div class="card">
            <Gmap-Map style="width: 100%; height: 300px;" :zoom="7" :options="options" :center="itinerary.steps[0].coords">
              <Gmap-Marker v-for="(step, i) in itinerary.steps"
                :key="i"
                :position="step.coords"
                ></Gmap-Marker>
            </Gmap-Map>
            <div class="card-body">
              <h5 class="card-title">{{itinerary.title}}</h5>
              <p class="card-text">{{itinerary.description}}</p>
            </div>
            <router-link class="cta_itinerari" :to="{ name: 'itinerarySingle', params: { slug: itinerary.slug }}">
              <div class="card-footer"> Go somewhere </div>
            </router-link>
          </div>
        </div>
      </paginate>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-4 mb-4" v-for="(item, index) in items">
          <router-link :to="{name: 'hotelSingle', params: { slug: item.slug } }" >
            <div class="destinazioni">
              <h4>{{item.name}}</h4>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sx-12 input--hotel mt-4">
          <paginate-links class="justify-content-end" for="itineraries" :show-step-links="true"></paginate-links>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="btn-generic">
            <router-link class="btn btn-full pt-2 pb-2 pr-3 pl-3" :to="{ name: 'contacts', params: {} }">Personalizza la tua esperienza</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import API from '@/api'

export default {
  name: 'ItinerariesList',
  components: {
  },
  data(){
    return {
      items: [],
      search: '',
      paginate: ['itineraries'],
      options: {
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false
      }
    }
  },
  created(){
    API.get('itineraries')
    .then(response => {
      console.log(response)
      this.$store.dispatch('setItineraries',response.data.set)
    })
    .catch(e => {
      console.log(e)
    })
  },
  computed:{
    getItineraries() {
      const self = this
      return this.$store.getters.getItineraries.filter(
        el => el.destinations
        .find(
          destination => destination.title.toLowerCase().includes(self.search.toLowerCase())
        )
      )
    }
  },
  methods:{
  }
}
</script>

<style scoped>
ul.card-group {
  padding: 0;
}

ul.card-group li {
  list-style: none;
}
.card-deck {
  text-align: center;
}
.input--hotel .input-group-text {
  background-color: transparent;
  border: 0;
  border-radius: 0;
  border-bottom: 2px solid rgba(	0, 0, 34 ,1);
}
.input--hotel .form-control {
  border: 0;
  border-radius: 0;
  border-bottom: 2px solid rgba(	0, 0, 34 ,1);
}
.img-hotel {
  width: 100%;
  min-height: 100%;
  height: auto;
  overflow: hidden;
}
.card-title {
  font-family: 'IM Fell English SC', serif;
  text-transform: lowercase;
}
.card-body a {
  color: #FFC200;
}
.card-body a:hover {
  color: rgba(	0, 0, 34 , 0.7);
  text-decoration: none;
}
</style>
