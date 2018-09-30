<template>
  <section class="row">
    <div class="col-lg-6 no-padding">
      <div style="background:url('https://source.unsplash.com/user/erondu/600x900'); height:90vh; background-size: cover;
">

      </div>
    </div>
    <div class="col-lg-6 content">
      dx
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  computed:{
    getFlashes() {
      return this.$store.getters.getFlashes
      .filter(
        el => el.slug === this.$route.params.slug
      )[0]
    }
  }
}
</script>

<style scoped>
.content {
	position: relative;
  padding: 30px
}
.no-padding {
  padding: 0;
}
</style>
