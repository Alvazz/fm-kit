<template>
  <section class="row content">

    <div class="col-lg-9 col-md-9 col-sm-12">
      <div class="row">
        <div class="col-lg-12">
          <div class="jumbotron">
            <h1 class="display-4">Hello, world!</h1>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr class="my-4">
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p class="lead">
              <a class="btn btn-primary btn-lg" href="#" role="button" @click="testApi">Learn more</a>
            </p>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-3">
              second bar
            </div>
            <div class="col-lg-9">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-12">
      sidebar
    </div>
  </section>
</template>

<script>
import API from '@/api'
import Swagger from '@/swagger-api'

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
  },
  computed: {
  },
  methods: {
    testApi(){

      console.log(Swagger.body.register.flashInitBody)

      const owner = {
        "owner": {
          "id": "10211594796978932",
          "social": "facebook",
          "token": "EAAG759WP80cBAHZCSoaQlDKp5T949IdhkZAwncfshnZADVYoH1pCPgcK6y2TTjoL8ZCBjlRMTZB0KM7N8vy3cgD1Iqxh52ZCfWZBYaZBRv8y5vDVRTbSOoZBZCMCrHZAN54h54ByoNkB8yVLecisHXHG3k9AQZBnZAgcydjbqqsNENYG3PEDXb2arB8tChKZBL0zrAZB7ZCclEyC488QAQZDZD"
        }
      }

      Swagger.api.register.appInitialization(owner, (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log('API called successfully. Returned data: ' + data);
        }
      })

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
