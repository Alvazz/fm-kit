<template>
  <div>
    <img :src="`http://localhost:3000/${currentItem.cover}`"/>
    <h1>{{currentItem.title}}</h1>
  </div>
</template>

<script>
import API from '@/api'
import jwt_decode from 'jwt-decode'

export default {
  name: 'Item',
  data() {
    return {
      item: null
    }
  },
  computed: {
    currentItem(){
      return this.$store.getters.currentItem(this.$route.params.id)[0]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.actions i {
  cursor: pointer;
}
</style>
