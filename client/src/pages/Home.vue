<template>
  <section class="row content">

    <div class="col-lg-9 col-md-9 col-sm-12">
      <div class="row">
        <div class="col-lg-12">
          <Jumbotron />
        </div>
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-3">
              <Trands />
            </div>
            <div class="col-lg-9">
              <div class="row">
                <div class="col-lg-12">
                  <InfoBox />
                </div>
                <div class="col-lg-6">
                  <InfoBox />
                </div>
                <div class="col-lg-6">
                  <InfoBox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-12">
      <InfoBox />
      <AdvBanner />
      <InfoBox />
    </div>
  </section>
</template>

<script>
import API from '@/api'
import Swagger from '@/swagger-api'
import Jumbotron from '@/components/jumbotron'
import InfoBox from '@/components/infoBox'
import AdvBanner from '@/components/advBanner'
import Trands from '@/components/trands'

export default {
  name: 'Home',
  components: {
    Jumbotron,
    InfoBox,
    AdvBanner,
    Trands
  },
  data() {
    return {
      loading: false,
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    testApi(){

      console.log(Swagger.body.register.flashInitBody)


      const owner = {
        owner: {
          id: "10211594796978932",
          social: "facebook",
          token: "EAAG759WP80cBAHZCSoaQlDKp5T949IdhkZAwncfshnZADVYoH1pCPgcK6y2TTjoL8ZCBjlRMTZB0KM7N8vy3cgD1Iqxh52ZCfWZBYaZBRv8y5vDVRTbSOoZBZCMCrHZAN54h54ByoNkB8yVLecisHXHG3k9AQZBnZAgcydjbqqsNENYG3PEDXb2arB8tChKZBL0zrAZB7ZCclEyC488QAQZDZD"
        }
      }
      //JSON.parse(sessionStorage.getItem('owner'))
      API.post('/flashmoov/rest/flash/init', owner)
      .then(res => {
        console.log(res.data)
      })

      /*
      Swagger.api.register.appInitialization(owner, (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log('API called successfully. Returned data: ' + data);
        }
      })
      */
    },
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
  position: relative;
  padding: 30px 0
}

.content--home a {
  color: rgba(0, 0, 34 ,1);
}
.card {
  margin-bottom: 30px;
}
</style>
