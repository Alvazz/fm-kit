<template>
  <header>
    <Gmap-Map style="width: 100%; height: 300px;" :zoom="13" :center="currentItem.geo.coords">
      <Gmap-Marker
        :position="currentItem.geo.coords"
        ></Gmap-Marker>
    </Gmap-Map>
  </header>
</template>

<script>
export default {
  data() {
    return {
      item: {}
    }
  },
  computed: {
    currentItem(){
      return this.$store.getters.currentItem(this.$route.params.id)[0]
    }
  }
}
</script>

<style lang="css">
</style>
