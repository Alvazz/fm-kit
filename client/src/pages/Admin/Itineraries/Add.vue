<template lang="html">
  <div class="row mt-5 mb-5">
    <div class="col-lg-12 col-md-12 col-sm-12">
    <h1 class="title">Add Itinerary</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptatum fugiat, quae, blanditiis optio odit nihil harum natus placeat voluptate ad consequatur enim accusantium nam temporibus illum. Nam, quo obcaecati.</p>
    <form>
      <formly-form :form="form" :model="model" :fields="fields" ref="addItineraryForm"></formly-form>
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
/*
{
  steps: { type: Array },
}
*/
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
        steps: [],
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
          key: 'type',
          type: 'select',
          options: ['Test1', 'Test2'],
          templateOptions: {
            label: 'Type'
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
          key: 'destinations',
          type: 'select',
          options: [],
          templateOptions: {
            label: 'Destinations'
          }
        },
        {
          key: 'steps',
          type: 'steps-with-field',
          templateOptions: {
            label: 'Steps',
            button: {
              options: {
                label: 'Click to upload',
                icon: 'upload'
              }
            },
            properties: {
              title: {},
              title: {
                type: 'text',
                placeholder: 'Titolo'
              },
              description: {
                type: 'textarea',
                maxlength: 200,
                placeholder: 'Description'
              }
            },
            wrapper: {
              properties: {
                label: 'Steps',
                addons: false
              }
            }
          }
        }
      ]
    }
  },
  created(){
    for(var key in this.fields){
      var field = this.fields[key]
      if (field.key === 'destinations') field.options = this.getDestinations()
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
    objectToFormData(obj, form, namespace) {
      var fd = form || new FormData();
      var formKey;
      for(var property in obj) {
        if(obj.hasOwnProperty(property)) {
          if(namespace) {
            formKey = namespace + '[' + property + ']';
          } else {
            formKey = property;
          }
          if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
            this.objectToFormData(obj[property], fd, property)
          } else {
            fd.append(formKey, obj[property])
          }

        }
      }

      return fd

    },
    doSomething(){
      this.$refs.addItineraryForm
        .validate()
        .then(() => {
          console.log(this.form.$valid)
          //if (!this.form.$valid) return
          this.loading = true

          const formData = new FormData()
          formData.append('title', this.model.title)
          formData.append('subtitle', this.model.subtitle)
          formData.append('status', this.model.status)
          formData.append('type', this.model.type)
          formData.append('destinations', this.model.destinations)

          for (var i = 0; i < this.model.steps.length; i++) {
            var step = this.model.steps[i]
            formData.append('steps[]', JSON.stringify(step))
          }

          formData.append('slug', this.stringToSlug(this.model.title))
          formData.append('userId', jwt_decode(this.$store.getters.getToken).userId)
          //data.append('cover', this.form.cover, this.form.cover.name)

          this.model.userId = jwt_decode(this.$store.getters.getToken).userId

          API.post('itineraries', this.model, {
            onUploadProgress: progressEvent => {
              //console.log(progressEvent.loaded / progressEvent.total)
            }
          })
            .then(response => {
              console.log(response)
              this.$store.dispatch('addItinerary',response.data.item)
              this.$router.push('/admin/itinerari')
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
