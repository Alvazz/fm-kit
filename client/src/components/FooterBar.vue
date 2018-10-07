<template>
  <footer class="footer fixed-bottom_ pt-3 pb-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-9 col-md-9 col-sm-12">
          <div class="row">
            <div class="col-lg-3 col-md-12 col-sm-12">
              <p>@ 2018 Flashmoov</p>
            </div>
            <div class="col-lg-2 col-md-12 col-sm-12">
              <ul class="footer--menu">
                <li>technology</li>
                <li>Ideas</li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-12 col-sm-12">
              <ul class="footer--menu">
                <li>Leadership</li>
                <li>Video</li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-12 col-sm-12">
              <ul class="footer--menu">
                <li>News</li>
                <li>Finance</li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-12 col-sm-12">
              <ul class="footer--menu">
                <li>Entertainment</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12">
          <div class="footer--social">
            Follow us:
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-twitter"></i>
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
  font-size: 0.8rem;
  height: 100px;
  color: #ffffff;
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

ul.footer--menu {
  list-style: none;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.7rem;
  line-height: 25px;
}
input {
  padding: 0 10px;
  border-radius: 0;
  font-size: 0.9rem;
  height: 30px;
}
.footer--social, .footer--subscribe {
  text-align: right;
}
.footer--social {
  padding: 0 18px 10px 0;
}
.footer--social i {
  padding: 0 5px;
}
</style>
