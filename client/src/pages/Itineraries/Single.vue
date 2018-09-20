<template>
  <section class="content pb-5">
    <div class="row ">

      <div class="col-lg-6 col-md-6 col-sm-6 p-0">
        <Gmap-Map style="width: 100%; height: 100%;" :zoom="7" :options="options" :center="getItinerary.steps[0].coords">
          <Gmap-Marker v-for="(step, i) in getItinerary.steps"
          :key="i"
          :position="step.coords"
          ></Gmap-Marker>
        </Gmap-Map>
      </div>
      <div class=" col-lg-6 col-md-6 col-sm-6 hotel_info pageview">
        <div class=" mt-2 ">
          <h1 class="content__title mb-0">{{getItinerary.title}}</h1>
          <div class="line mb-2 mt-1"></div>
          <p>{{getItinerary.description}}</p>
          <div v-for="(step, i) in getItinerary.steps">
            <h4>DAY {{i+1}}</h4>
            <p>{{step.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 mb-5">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <h3>Destinazione</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12" v-for="(destination, i) in getItinerary.destinations">
            <router-link :to="{name: 'destinationSingle', params: { slug: destination.slug } }" >
              <div class="destinazioni">
                <h4>{{destination.title}}</h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 mb-5">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="btn-generic">
          <router-link class="btn btn-full pt-2 pb-2 pr-3 pl-3" :to="{ name: 'contacts', params: {} }">Personalizza la tua esperienza</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SingleItinerary',
  components: {
  },
  data(){
    return {
      options: {
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false
      }
    }
  },
  computed: {
    getItinerary() {
      return this.$store.getters.getItineraries
      .filter(
        el => el.slug === this.$route.params.slug
      )[0]
    }
  }
}
</script>

<style scoped>
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
.hotel_info .cta {
  text-align: center;
  margin: auto;
  width: 100%;
  border: 2px solid transparent;
  background-color: rgba(	0, 0, 34,1);
  color: #ffffff!important;
}
.hotel_info .cta:hover {
  background-color: #ffffff;
  border: 2px solid rgba(	0, 0, 34,1);
  color: rgba(0, 0, 34,1)!important;
}
.destinazioni {
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(rgba(97, 98 ,116 , .5), rgba(97, 98 ,116 , .5)), url("../../assets/destinazione.png") no-repeat;
  background-size: cover;
  color: white;
  text-align: center;
}
.destinazioni:hover {

  overflow: hidden;
  background: linear-gradient(rgba(97, 98 ,116 , .0), rgba(97, 98 ,116 , .0)), url("../../assets/destinazione.png") no-repeat;
  background-size: cover;
}
.destinazioni h4 {
  font-size: 3em;
  position: relative;
  float: left;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.destinazioni a{color:white;}
/*dest singola*/
.img-destinazione{
  width:auto;
  height:100%;
  overflow: hidden;
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
