<template>
  <footer class="footer fixed-bottom pt-3 pb-2" v-show="false">
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <router-link to="/" >
            <img src="@/assets/logo.png" alt="" width="auto" height="30">
          </router-link>
        </div>

        <div class="col-7 copy">
          <p> Copyright © 2018. All rights reserved. </p>
        </div>
        <div class="scrollTop col-2">
          <div class="elevator-button" ref="elevatorup">
            <i class="fas fa-2x fa-angle-up" style="color:#fff; "></i>
            <span class="entypo-up-open"></span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>

export default {
  components: {},
  data() {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped>
.footer {
  background-color: rgba(	24, 27, 47, 1);
}
.copy {
  color: #ffffff;
  text-align: center;
}
.copy-arrow {
  text-align: right;
  color: #ffffff;
}
.scrollTop{text-align: right;}
</style>
