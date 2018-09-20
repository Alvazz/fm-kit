<template>
    <div class="row mt-5 mb-5 pageview_">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6 mb-2">
            <h3>Destinazioni</h3>
            <div class="line mb-2 mt-2"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-4 mb-4" v-for="(item, index) in getDestinations">
            <router-link :to="{name: 'destinationSingle', params: { slug: item.slug } }" >
              <div class="destinazioni">
                <h4>{{item.title}}</h4>
              </div>
            </router-link>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="btn-generic"> <a href="contatti.html" class="btn btn-full pt-2 pb-2 pr-3 pl-3">Personalizza la tua esperienza</a> </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import API from '@/api'

export default {
  data(){
    return {
    }
  },
  created(){
    API.get('destinations')
    .then(response => {
      console.log(response)
      this.$store.dispatch('setDestinations',response.data.set)
    })
    .catch(e => {
      console.log(e)
    })
  },
  computed:{
    getDestinations() {
      return this.$store.getters.getDestinations
    }
  }
}
</script>

<style scoped>
.pageview {
	height: 100vh;
	overflow-y: scroll;
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
</style>
