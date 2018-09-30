<template>
  <div class="form-group">
    <label class="label">{{field.templateOptions.wrapper.properties.label}}</label>
    <div class="control has-icons-right">
      <gmap-autocomplete v-model="model[field.key].formatted_address" @change="changeFocus" :placeholder="field.templateOptions.properties.placeholder" @place_changed="setPlace"  class="form-control autocomplete" :class="{'is-danger' : isRequired}" :required="properties.required"> </gmap-autocomplete>
      <span class="icon is-small is-right  is-clickable" v-show="isEmpty" @click="change">
        <i class="fas fa-times-circle"></i>
      </span>
      <span class="icon is-right has-text-danger is-small" v-show="isRequired">
        <i class="fa fa-exclamation-circle"></i>
      </span>
      <p class="help is-danger" v-show="isRequired">Compila questo campo.</p>
    </div>
</div>
</template>

<script>
import BaseFormlyFieldMixin from 'vue-formly-buefy/src/mixins/base-formly-field'
import RequiredFieldMixin from 'vue-formly-buefy/src/mixins/fields/required'
export default {
  name: 'vfbGoogleAutocomplete',
  mixins: [BaseFormlyFieldMixin, RequiredFieldMixin],
  data() {
    return {
      isRequired: false
    }
  },
  created() {
    console.log(this.model[this.field.key])
  },
  computed: {
    isEmpty() {
      return this.model[this.field.key].formatted_address
    }
  },
  methods: {
    changeFocus() {
      console.log('qui change focus')
      if (
        this.properties.required &&
        this.model[this.field.key].formatted_address !== ''
      ) {
        this.isRequired = true
      } else {
        this.isRequired = false
      }
    },
    change() {
      this.formatted_address = ''
      this.model[this.field.key] = {
        item: {},
        location: { lat: 0, lng: 0 },
        formatted_address: ''
      }
    },
    getMarkerPosition(marker) {
      console.log(marker.lat(), marker.lng())

      this.model[this.field.key].location = {
        lat: marker.lat(),
        lng: marker.lng()
      }
      let geocoder = new google.maps.Geocoder()
      geocoder.geocode(
        { location: this.model[this.field.key].location },
        (results, status) => {
          if (status === 'OK') {
            this.model[this.field.key].formatted_address =
            results[0].formatted_address
          }
        }
      )
    },
    setPlace(place) {
      console.log(this.field.key)
      this.model[this.field.key].formatted_address = place.formatted_address
      //this.model[this.field.key].name = place.formatted_address
      this.model[this.field.key].coords = {}
      this.model[this.field.key].coords.lat = place.geometry.location.lat()
      this.model[this.field.key].coords.lng = place.geometry.location.lng()

    }
  }
}
</script>
<style scoped>
.has-icons-right {
  position: relative;
}
.is-right {
  position: absolute;
  right: 8px;
  top: 8px;
}
.is-clickable {
  cursor: pointer;
}
</style>
