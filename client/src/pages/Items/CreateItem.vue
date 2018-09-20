<template>
  <div class="section">
    <p v-if="loading" class="notification is-info">
      Loading
    </p>
    <template v-else>
      <div class="notification is-danger" v-show="this.error">
        <button class="delete" @click="closeError"></button>
        {{this.error}}
      </div>
      <h1 class="title">Add Item</h1>
      <form method="post" id="add-product-form" action="/admin/products/add-product" enctype="multipart/form-data">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" type="text" v-model="form.title" placeholder="Name">
          </div>
        </div>
        <div class="field">
          <label class="label">Start at</label>
          <div class="control">
            <date-picker v-model="form.startAt" lang="en" type="datetime" format="YYYY-MM-DD hh:mm:ss a" :time-picker-options="{ start: '00:00', step: '00:30', end: '23:30' }"></date-picker>
          </div>
        </div>
        <div class="field">
          <label class="label">Position</label>
          <div class="control">
            <gmap-autocomplete
              class="input"
              placeholder="Add position"
              @place_changed="setPlace">
            </gmap-autocomplete>
            <Gmap-Map style="width: 100%; height: 300px;" :zoom="1" :center="{lat: 0, lng: 0}">
              <Gmap-Marker v-for="(marker, i) in form.marker"
                :key="i"
                :position="form.marker.position"
                ></Gmap-Marker>
              <Gmap-Marker
                v-if="form.place"
                :position="{
                  lat: form.place.geometry.location.lat(),
                  lng: form.place.geometry.location.lng(),
                }"
                ></Gmap-Marker>
            </Gmap-Map>
          </div>
        </div>
        <div class="field">
          <label class="label">Source</label>
          <div class="control">
            <input class="input" type="text" v-model="form.source" placeholder="http://">
          </div>
        </div>
        <div class="upload" v-if="form.files.length > 0">
          <div class="table-responsive">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th></th>
                  <th>#</th>
                  <th>Thumb</th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <draggable class="table is-fullwidth" :options="{handle:'.handle'}" v-model="form.files" @end="getImagePreviews" element="tbody">
                <tr v-for="(file, index) in form.files">
                  <td class="handle"><i class="fa fa-bars"></i></td>
                  <td>{{index+1}}</td>
                  <td class="has-text-centered">
                    <img v-if="file.name" :ref="'image'+parseInt(index)" width="40" height="auto" />
                    <span v-else>
                      <i class="fa fa-file-image fa-3x"></i>
                    </span>
                  </td>
                  <td>
                    <div class="filename">
                      <span>{{file.name}}</span>
                    </div>
                  </td>
                  <td>{{file.size}}</td>
                  <td>
                    <span class="icon is-small has-text-danger " @click.prevent="removeFile(index, file)">
                      <i class="fas fa-trash" aria-hidden="true"></i>
                    </span>
                  </td>
                </tr>
              </draggable>
            </table>
          </div>
        </div>
        <div class="field">
          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" type="file" ref="files" accept="image/*" multiple @change="onFileChangedMulti"/>
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
            </label>
          </div>
        </div>
        <div class="select">
          <select v-model="form.status">
            <option>new</option>
            <option>draft</option>
            <option>close</option>
          </select>
        </div>
        <a class="button is-primary" @click="addMultiItem">Add</a>
      </form>
    </template>
  </div>
</template>

<script>
import API from '@/api'
import jwt_decode from 'jwt-decode'
import DatePicker from 'vue2-datepicker'
import Draggable from 'vuedraggable'

export default {
  components: {
    DatePicker,
    Draggable
  },
  data() {
    return {
      loading: false,
      error: false,
      form: {
        title: '',
        userId: '',
        type: '',
        cover: '',
        source: 'cSkxrLC2yq8',
        files:[],
        markers: [],
        place: null,
        follower: [],
        comments: [],
        startAt: '',
        status: 'new'
      }
    }
  },
  methods: {
    setPlace(place) {
      this.form.place = place
    },
    onFileChanged(event) {
      this.form.cover = event.target.files[0]
    },
    onFileChangedMulti(event) {
      let uploadedFiles = this.$refs.files.files

      for( var i = 0; i < uploadedFiles.length; i++ ){
        this.form.files.push( uploadedFiles[i] )
      }

      this.getImagePreviews()

    },
    getImagePreviews(){
      for( let i = 0; i < this.form.files.length; i++ ){
        if ( /\.(jpe?g|png|gif)$/i.test( this.form.files[i].name ) ) {
          let reader = new FileReader()

          reader.addEventListener("load", function(){
            this.$refs['image'+parseInt( i )][0].src = reader.result;
          }.bind(this), false);

          reader.readAsDataURL( this.form.files[i] );
        }
      }
    },
    closeError() {
      this.error = false
    },
    addItem() {
      this.loading = true
      const data = new FormData()
      data.append('title', this.form.title)
      data.append('type', this.form.type)
      data.append('geoName', this.form.place.formatted_address)
      data.append('geoLat', this.form.place.geometry.location.lat())
      data.append('geoLng', this.form.place.geometry.location.lng())
      data.append('source', this.form.source)
      data.append('startAt', this.form.startAt)
      data.append('follower', this.form.follower)
      data.append('status', this.form.status)
      data.append('comments', this.form.comments)
      data.append('userId', jwt_decode(this.$store.getters.getToken).userId)
      data.append('cover', this.form.cover, this.form.cover.name)

      API.post('items', data, {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total)
        }
      })
        .then(response => {
          console.log(response)
          this.$store.dispatch('addItem',response.data.item)
          this.$router.push('/items')
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          this.error = error.response.data.error.message
          console.log(error.response.status)
          console.log(error.response.data.error.message)
        })
    },
    removeFile(i, file){
      console.log(i, file)
      this.form.files.splice(i, 1)
      this.getImagePreviews()

    },
    addMultiItem() {
      this.loading = true
      const formData = new FormData()

      formData.append('title', this.form.title)
      formData.append('type', this.form.type)
      formData.append('geoName', this.form.place.formatted_address)
      formData.append('geoLat', this.form.place.geometry.location.lat())
      formData.append('geoLng', this.form.place.geometry.location.lng())
      formData.append('source', this.form.source)
      formData.append('startAt', this.form.startAt)
      formData.append('follower', this.form.follower)
      formData.append('status', this.form.status)
      formData.append('comments', this.form.comments)
      formData.append('userId', jwt_decode(this.$store.getters.getToken).userId)

      for (var i = 0; i < this.form.files.length; i++) {
        var file = this.form.files[i]
        console.log(file.name)
        formData.append('cover', file, file.name);
      }

      API.post('items/multi', formData)
        .then(response => {
          console.log(response)
          this.$store.dispatch('addItem',response.data.item)
          this.$router.push('/items')
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          this.error = error.response.data.error.message
          console.log(error.response.status)
          console.log(error.response.data.error.message)
        })

    }
  }
}
</script>

<style scoped="">
.upload  {
  padding-bottom: 10px;
}
.upload .upload-draggable {
  display: block;
}
.preview {
  width: 80px;
}
</style>
