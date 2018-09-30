<template>
  <section class="content pb-5">
    <div class="row ">
      <div class="col-lg-6 col-md-6 col-sm-6 p-0">
        <b-carousel id="carousel1"
        style="text-shadow: 1px 1px 2px #333;"
        indicators
        controls
        background="#ababab"
        :interval="4000"
        >
        <b-carousel-slide :img-src="img" v-for="(img, i) in getHotel.media.img"></b-carousel-slide>
      </b-carousel>
    </div>
    <div class=" col-lg-6 col-md-6 col-sm-6 hotel_info pageview">
      <div class="title-hotel mt-2 ">
        <h1 class="content__title mb-0">{{getHotel.title}}<br>
          {{getHotel.subtitle}}</h1>
          <div class="line mb-2 mt-1"></div>
          <p>{{getHotel.description}}</p>
        </div>
        <div role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-btn block href="#" v-b-toggle.accordion1>Mappa</b-btn>
            </b-card-header>
            <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <Gmap-Map style="width: 100%; height: 200px;" :zoom="7" :options="options" :center="getHotel.geo.coords">
                  <Gmap-Marker :position="getHotel.geo.coords"></Gmap-Marker>
                </Gmap-Map>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-btn block href="#" v-b-toggle.accordion2>Group 2</b-btn>
            </b-card-header>
            <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <p class="card-text">
                  {{getHotel.description}}
                </p>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-btn block href="#" v-b-toggle.accordion3>Group 3</b-btn>
            </b-card-header>
            <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <p class="card-text">
                  {{getHotel.description}}
                </p>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <div class="mb-2 mt-2 "> <a href="contatti.html" class="cta btn pt-2 pb-2 pr-3 pl-3">Get more informations</a> </div>
      </div>
    </div>
  </div>
  <div class="row mt-5">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <h3>Itinerario in cui l'hotel è presente</h3>
    </div>
  </div>
  <paginate class="row card-group " name="itineraries" :list="getHotel.itineraries" :per="4">
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
<div class="row mt-5_ mb-5">
  <div class="col-lg-12 col-md-12 col-sm-12">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h3>Destinazione</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12" v-for="(destination, i) in getHotel.destinations">
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
<pre>{{getHotel}}</pre>
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
    getHotel() {
      return this.$store.getters.getHotels
      .filter(
        el => el.slug === this.$route.params.slug
      )[0]
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
  height: 440px;
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
