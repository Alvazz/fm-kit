<template lang="html">
  <div class="row mt-5 mb-5">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <h1 class="title">Add Destionation</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptatum fugiat, quae, blanditiis optio odit nihil harum natus placeat voluptate ad consequatur enim accusantium nam temporibus illum. Nam, quo obcaecati.</p>
      <form>
        <formly-form :form="form" :model="model" :fields="fields" ref="addDestinationForm"></formly-form>
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
export default {
  data() {
    return {
      form: {},
      model: {
        title: '',
        subtitle: '',
        status: '',
        description: '',
        infos: '',
        when: '',
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
          key: 'description',
          type: 'textarea',
          templateOptions: {
            label: 'Description'
          }
        },
        {
          key: 'when',
          type: 'textarea',
          templateOptions: {
            label: 'Quando Andare'
          }
        },
        {
          key: 'infos',
          type: 'textarea',
          templateOptions: {
            label: 'Info Utili'
          }
        }
      ]
    }
  },
  created(){
  },
  computed:{
  },
  methods: {
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
      this.$refs.addDestinationForm
      .validate()
      .then(() => {
        console.log(this.form.$valid)
        //if (!this.form.$valid) return

        this.loading = true
        const formData = new FormData()
        formData.append('title', this.model.title)
        formData.append('subtitle', this.model.subtitle)
        formData.append('description', this.model.description)
        formData.append('when', this.model.when)
        formData.append('infos', this.model.infos)
        formData.append('slug', this.stringToSlug(this.model.title))
        //data.append('userId', jwt_decode(this.$store.getters.getToken).userId)
        //data.append('cover', this.form.cover, this.form.cover.name)
        console.log(formData)

        API.post('destinations', formData, {
          onUploadProgress: progressEvent => {
            //console.log(progressEvent.loaded / progressEvent.total)
          }
        })
        .then(response => {
          console.log(response)
          this.$store.dispatch('addDestination',response.data.item)
          this.$router.push('/admin/destinazioni')
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
