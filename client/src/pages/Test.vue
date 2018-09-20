<template>
  <div class="section">
  <div class="box">
    <v-calendar

      is-double-paned>
    </v-calendar>
  </div>
    <div class="box">
      {{selectedValue.start.toDateString()}}| {{days_between}} | {{selectedValue.end.toDateString()}}
    <v-date-picker
      mode='range'
      is-inline
      show-popover="false"
      is-double-paned
      show-caps
      :min-date="new Date()"
      v-model='selectedValue'>
    </v-date-picker>
    </div>
    <div class="columns" >
      <div class="column">
        <div class="box">
          <div class="panel">
            <div class="panel-block">
              <p class="control has-icons-left has-icons-right">
                <gmap-autocomplete v-model="place" @change.native="change" @place_changed="setPlace" class="input autocomplete"/>
                <span class="icon is-small is-left">
                  <i class="fas fa-search" aria-hidden="true"></i>
                </span>
                <span class="icon is-small is-right  is-clickable" v-show="isEmpty" @click="change">
                  <i class="fas fa-times-circle"></i>
                </span>
              </p>
            </div>
            <div class="panel-block" v-for="(item, index) in places" :key="index">
              <span class="panel-icon">
                <i v-if="index === 0" class="fas fa-map-marker-alt" aria-hidden="true"></i>
                <i v-else-if="index == places.length - 1" class="fas fa-map-marker-alt" aria-hidden="true"></i>
                <i v-else class="fas fa-genderless" aria-hidden="true"></i>
              </span>
              {{item.formatted_address}}
              <a class="panel-delete is-clickable" @click="deletePlace(index)">
                <i class="fas fa-times-circle" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="column" >
        <div class="box" v-show="places.length > 0">
            <GmapMap
            ref="xyz"
            :center="center"
            :zoom="7"
            style="width: 100%; height: 300px">
            <GmapMarker
            :key="index"
            v-for="(m, index) in places"
            :position="m.geometry.location"
            :clickable="true"
            :draggable="false"
            @click="showNear"
            />
            <GmapMarker
            :key="index"
            v-for="(m, index) in near"
            :position="m"
            :clickable="true"
            :draggable="false"
            @click="addNear"
            />
          </GmapMap>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import DatePickerDayPopover from '@/components/DatePickerDayPopover'; // .vue file

export default {
  data() {
    return {
      attribute: {
        popover: {
          component: DatePickerDayPopover,
          hideIndicator: true // Don't want to show the indicator
        }
      },
      selectedValue: {start:new Date(), end:new Date()},
      center: { lat: 0, lng: 0 },
      near: [],
      place: '',
      places: []
    }
  },
  computed: {
    days_between() {

      // The number of milliseconds in one day
      var ONE_DAY = 1000 * 60 * 60 * 24

      // Convert both dates to milliseconds
      const date1_ms = this.selectedValue.start.getTime()
      const date2_ms = this.selectedValue.end.getTime()

      // Calculate the difference in milliseconds
      const difference_ms = Math.abs(date1_ms - date2_ms)

      // Convert back to days and return
      return Math.round(difference_ms/ONE_DAY)

    },
    isEmpty() {
      return this.place !== ''
    }
  },
  methods: {
    setPlace(place) {
      this.place = place.formatted_address
      this.places.push(place)
      this.center = place.geometry.location
      console.log(this.places)
      this.createPolyline()
    },
    deletePlace(index) {
      this.places.splice(index, 1)
      this.createPolyline()
    },
    createPolyline() {
      if (this.flightPath != null) {
        this.flightPath.setMap(null)
        this.flightPath = null
      }
      const flightPlanCoordinates = []

      for (var i = 0; i < this.places.length; i++) {
        flightPlanCoordinates.push(this.places[i].geometry.location)
      }

      this.flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      })

      this.flightPath.setMap(this.$refs.xyz.$mapObject)
    },
    showNear() {
      alert('qui')
      this.near = [
        { lat: 37.772, lng: -122.214 },
        { lat: 21.291, lng: -157.821 },
        { lat: -18.142, lng: 178.431 },
        { lat: -27.467, lng: 153.027 }
      ]
    },
    addNear() {
      alert('qui')
      this.near = []
      var item = {}
      item['geometry'] = {}
      item['geometry']['location'] = { lat: -27.467, lng: 153.027 }
      this.places.push(item)
    },
    getRoute() {
      if (this.directionsDisplay != null) {
        this.directionsDisplay.setMap(null)
        this.directionsDisplay = null
      }
      this.directionsService = new google.maps.DirectionsService()
      this.directionsDisplay = new google.maps.DirectionsRenderer()

      this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)

      const vm = this
      const request = {
        travelMode: google.maps.TravelMode.DRIVING
      }
      for (var i = 0; i < this.places.length; i++) {
        if (i == 0) {
          request.origin = this.places[i].formatted_address
          request.destination = this.places[i].formatted_address
        } else if (i == this.places.length - 1) {
          request.destination = this.places[i].formatted_address
        } else {
          if (!request.waypoints) request.waypoints = []
          request.waypoints.push({
            location: this.places[i].formatted_address,
            stopover: true
          })
        }
      }

      if (this.places.length > 1) {
        vm.directionsService.route(request, function(response, status) {
          if (status === 'OK') {
            vm.directionsDisplay.setDirections(response)
          } else {
            console.log('Directions request failed due to ' + status)
          }
        })
      } else {
        if (vm.directionsDisplay != null) {
          vm.directionsDisplay.setMap(null)
          vm.directionsDisplay = null
        }
      }
    },
    change() {
      this.place = ''
    }
  }
}
</script>

<style scoped>
.panel-delete {
  position: absolute;
  right: 0;
}
</style>
