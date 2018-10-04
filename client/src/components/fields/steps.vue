<template>
  <div>
    <div class="form-group">
      <label for="">{{field.templateOptions.wrapper.properties.label}}</label>
      <input type="text" class="form-control" v-model="step.title" :placeholder="field.templateOptions.properties.title.placeholder">
    </div>
    <div class="form-group">
      <gmap-autocomplete v-model="step.geo.name" @place_changed="setPlace"  class="form-control autocomplete"> </gmap-autocomplete>
    </div>
    <div class="form-group">
      <textarea name="name" class="form-control" v-model="step.description" :placeholder="field.templateOptions.properties.description.placeholder" rows="8" cols="80"></textarea>
    </div>
    <div class="btn btn-full pt-2 pb-2 pr-3 pl-3 mb-3" @click="add">Add Step</div>
    <div class="card mb-3" v-show="this.model[this.field.key].length > 0">
      <div class="card-body">
        <table class="table is-fullwidth" >
          <thead>
            <tr>
              <th><abbr title="Position">#</abbr></th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(step, i) in this.model[this.field.key]">
              <th>{{i+1}}</th>
              <td>
                {{step.title}}
              </td>
              <td class="actions">
                <span  @click="remove(i)"><i class="fa fa-trash"></i></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
//not required but this baseField has a lot of useful stuff already in it, check it out
import baseField from 'vue-formly-bootstrap/src/fields/baseField'
export default {
  mixins: [baseField],
  data() {
    return {
      step: {
        title: '',
        description: '',
        geo: {
          name: '',
          coords: {}
        }
      }
    }
  },
  methods: {
    setPlace(place) {
      this.step.name = place.formatted_address
      this.step.coords = {}
      this.step.coords.lat = place.geometry.location.lat()
      this.step.coords.lng = place.geometry.location.lng()
    },
    add() {
      if (this.step.title.length > 0 && this.step.description.length > 0) {
        this.model[this.field.key].push(this.step)
        this.step = {
          title: '',
          description: '',
          geo: {
            name: '',
            coords: {}
          }
        }
      }
    },
    edit() {},
    remove(i) {
      this.model[this.field.key].splice(i, 1)
    }
  }
}
</script>
