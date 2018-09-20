<template>
  <section class="content mb-5 pb-5">
    <div class="row  mb-5 pageview">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6 p-0">
            <div class="img-destinazione"><img :src="getDestination.cover" alt="img-destinazione"></div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <h1 class="content__title mb-0">{{getDestination.title}}</h1>
            <div class="line mb-2 mt-1"></div>
            <p>{{getDestination.description}}</p>
            <h3>Quando andare</h3>
            <p>{{getDestination.when}}</p>
            <h3>Info utili</h3>
            <p>{{getDestination.infos}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h3>Hotel in questa destinazione</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sx-12 mb-4" v-for="(hotel, i) in getHotels">
        <div class="card">
          <img class="card-img-top" :src="hotel.cover" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{hotel.title}}</h5>
            <p class="card-text">{{hotel.description}}</p>
          </div>
          <div class="card-footer">
            <router-link class="btn btn-full pt-2 pb-2 pr-3 pl-3" :to="{name: 'hotelSingle', params: {slug: hotel.slug } }" >
              Go somewhere
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-lg-12 col-md-6 col-sm-12">
        <div class="row mt-5">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <h3>Itinerari di questa destinazione</h3>
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
          <div class="col-lg-12 col-md-12 col-sx-12 input--hotel mt-4">
            <paginate-links class="justify-content-end" for="itineraries" :show-step-links="true"></paginate-links>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="btn-generic"> <a href="contatti.html" class="btn btn-full pt-2 pb-2 pr-3 pl-3">Personalizza la tua esperienza</a> </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return {
      paginate: ['itineraries'],
      options: {
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false
      }
    }
  },
  computed:{
    getItineraries() {
      return this.$store.getters.getItineraries
      .filter(
        el => el.destinations
        .find(
          destination => destination.slug === this.$route.params.slug
        )
      )
    },
    getDestination() {
      const data = this.$store.getters.getDestinations
      .filter((el) => {
        return el.slug === this.$route.params.slug
      })
      return  data[0]
    },
    getHotels() {
      return this.$store.getters.getHotels
      .filter(
        el => el.destinations
        .find(
          destination => destination.slug === this.$route.params.slug
        )
      )
    }
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

.pageview {
	height: 80vh;
	overflow-y: scroll;
}
.content__title {
	padding-top: 1em;
	text-align: left;
	text-transform: capitalize;
}
.line {
	border: 1px solid rgba(	0, 0, 34 , 1);
	width: 10%;
}
.img-destinazione{
	width:auto;
	height:100%;
	overflow: hidden;
}
</style>
