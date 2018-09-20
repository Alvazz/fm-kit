<template>
  <f7-page>
    <f7-navbar back-link="Back"></f7-navbar>
    <CardList :items="items"/>
  </f7-page>
</template>

<script>
import {
  f7Navbar,
  f7Page,
  f7Block,
  f7Tabs,
  f7Tab,
  f7Link,
  f7Toolbar,
  f7NavRight
} from 'framework7-vue'
import API from '@/api'
import jwt_decode from 'jwt-decode'
import profilePerimeter from '@/perimeters/profilePerimeter'
import uuid from 'uuid'
import Avatar from 'vue-avatar'
import Countdown from '@/components/countdown'
import EventBus from '@/event-bus'
import CardList from '@/components/card-list'

export default {
  components: {
    Avatar,
    Countdown,
    CardList,
    f7Navbar,
    f7Page,
    f7Block,
    f7Tabs,
    f7Tab,
    f7Link,
    f7Toolbar,
    f7NavRight
  },
  perimeters: [profilePerimeter],
  data() {
    return {
      flashed: [],
      items: []
    }
  },
  beforeCreate() {
    const self= this
    API.get('items/'+this.$f7route.params.id)
    .then(response => {
      const item = response.data.item
      self.items = [item]
    })
    .catch(e => {
      console.log(e)
    })
  },
  computed: {
    getCurrentUser() {
      return jwt_decode(sessionStorage.getItem('token'))
    }
  },
  methods: {
    isFlashed(id) {
      return this.flashed.includes(id)
    },
    emitMethod() {
      EventBus.$emit('EVENT_NAME', payLoad)
    },
    flashToggle(id) {
      this.flashed.includes(id)
      ? this.flashed.splice(this.flashed.indexOf(id), 1)
      : this.flashed.push(id)
    }
  }
}
</script>
<style>
.vuejs-countdown.center-countdown {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  text-align: center;
  color: #fff;
}
.overlay {
  display: flex;
  height: 100%;
  position: absolute;
  width: 100%;
  opacity: 0.5;
  background: #000;
}
</style>
