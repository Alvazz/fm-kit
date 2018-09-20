<template lang="html">
  <div class="row mt-5 mb-5">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <h1 class="title">Add Hotel</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptatum fugiat, quae, blanditiis optio odit nihil harum natus placeat voluptate ad consequatur enim accusantium nam temporibus illum. Nam, quo obcaecati.</p>
      <form>
        <formly-form :form="form" :model="model" :fields="fields" ref="addHotelForm"></formly-form>
      </form>
      <div class="row mb-5">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="btn-generic">
            <div class="btn btn-full pt-2 pb-2 pr-3 pl-3" @click="doSomething">Submit</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'
import jwt_decode from 'jwt-decode'

export default {
  data() {
    return {
      destinations: '',
      form: {},
      model: {
        title: '',
        subtitle: '',
        status: '',
        description: '',
        geo: {},
        mediaUpload: [],
        destinations: ''
      },
      fields: [
        {
          key: 'title',
          type: 'input',
          templateOptions: {
            label: 'Title'
          }
        },
        {
          key: 'subtitle',
          type: 'input',
          templateOptions: {
            label: 'Subtitle'
          }
        },
        {
          key: 'status',
          type: 'select',
          options: ['Online', 'Offline'],
          templateOptions: {
            label: 'Status'
          }

        },
        {
          key: 'description',
          type: 'textarea',
          templateOptions: {
            label: 'Description'
          }
        },
        {
          key: 'geo',
          type: 'google-autocomplete-with-field',
          templateOptions: {
            properties: {
              placeholder: this.$t('form.location.placeholder')
            },
            wrapper: {
              properties: {
                label: this.$t('form.location.label'),
                addons: false
              }
            }
          },
          validators: {
            length: {
              expression: 'model[field.key].length > 1',
              message: this.$t('form.error.toShort')
            }
          }
        },
        {
          key: 'itineraries',
          type: 'select',
          options: [],
          templateOptions: {
            label: 'Itineraries'
          }
        },
        {
          key: 'destinations',
          type: 'select',
          options: [],
          templateOptions: {
            label: 'Destinations'
          }
        },
      ]
    }
  },
  created(){
    for(var key in this.fields){
      var field = this.fields[key]
      if (field.key === 'destinations') field.options = this.getDestinations()
      if (field.key === 'itineraries') field.options = this.getItineraries()
    }
  },
  computed:{
  },
  methods: {
    getDestinations() {
      return this.$store.getters.getDestinations.map((destination)=>{
        return { label: destination.title, value: destination._id }
      })
    },
    getItineraries() {
      return this.$store.getters.getItineraries.map((itinerary)=>{
        return { label: itinerary.title, value: itinerary._id }
      })
    },
    stringToSlug (str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaaeeeeiiiioooouuuunc------";

        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    },
    doSomething(){
      this.$refs.addHotelForm
        .validate()
        .then(() => {
          console.log(this.form.$valid)
          //if (!this.form.$valid) return

          this.loading = true
          const formData = new FormData()
          formData.append('title', this.model.title)
          formData.append('subtitle', this.model.subtitle)
          formData.append('type', this.model.type)
          formData.append('geoName', this.model.geo.name)
          formData.append('geoLat', this.model.geo.coords.lat)
          formData.append('geoLng', this.model.geo.coords.lng)
          formData.append('status', this.model.status)
          formData.append('destinations', this.model.destinations)
          formData.append('itineraries', this.model.itineraries)
          formData.append('slug', this.stringToSlug(this.model.title))
          formData.append('userId', jwt_decode(this.$store.getters.getToken).userId)
          //data.append('cover', this.form.cover, this.form.cover.name)
          console.log(formData)
          API.post('hotels', formData, {
            onUploadProgress: progressEvent => {
              //console.log(progressEvent.loaded / progressEvent.total)
            }
          })
            .then(response => {
              console.log(response)
              this.$store.dispatch('addHotel',response.data.item)
              this.$router.push('/admin/hotels')
              this.loading = false
            })
            .catch(error => {
              this.loading = false
              //this.error = error.response.data.error.message
              console.log(error.response.status)
              console.log(error.response.data.error.message)
            })


          console.log(this.model)

          // submit form
        })
        .catch(e => {
          console.log(e)
          // do something with the error
        })
    }
  }
}
</script>

<style lang="css">
</style>
