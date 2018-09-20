<template>
  <div>
  <f7-card  v-for="(item, index) in items" :key="index" class="demo-facebook-card">
    <f7-card-header class="no-border">
      <f7-link :href="`/profile/${item.user._id}`" :animate="true"  class="demo-facebook-avatar">
        <avatar :username="item.user.username"
          :src="item.user.pic"
          :size="32">
        </avatar>
      </f7-link>
      <f7-link :href="`/item/${item._id}`" :animate="true" class="demo-facebook-name">{{item.title}}</f7-link>
      <div class="demo-facebook-date">{{item.geo.name}}</div>
    </f7-card-header>
    <f7-card-content :padding="false">
      <div class="overlay" @click="flashToggle(item._id)"></div>
      <Countdown class="center-countdown" :end="convertInDate(item.startAt)"></Countdown>
      <img :src="isUrl(item.cover)" width="100%" height="1500" class="lazy lazy-fadeIn demo-lazy"/>
    </f7-card-content>
    <f7-card-footer class="no-border">
      <f7-link v-if="isFlashed(item._id)" @click="flashToggle(item._id)" icon-ios="f7:heart" icon-md="material:flash_on"></f7-link>
      <f7-link v-else @click="flashToggle(item._id)" icon-ios="f7:heart" icon-md="material:flash_off"></f7-link>
      <f7-link icon-ios="f7:heart" icon-md="material:comment"></f7-link>
      <f7-link icon-ios="f7:heart" icon-md="material:share"></f7-link>
    </f7-card-footer>
  </f7-card>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
import Countdown from '@/components/countdown'

export default {
  props: ['items'],
  components: {
    Avatar,
    Countdown
  },
  data() {
    return {
      flashed: [],
      baseUrl: 'http://localhost:3000/'
    }
  },
  computed: {},
  methods: {
    convertInDate(date) {
      return new Date(date)
    },
    isUrl(str) {
      var pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ) // fragment locator
      if (!pattern.test(str)) {
        return this.baseUrl + str
      } else {
        return str
      }
    },
    isFlashed(id) {
      return this.flashed.includes(id)
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
.block.block-cards {
  padding: 0;
}

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
img.demo-lazy {
  width: 100%;
  height: auto;
  display: block;
}
div.demo-lazy {
  background: #aaa;
  background-size: cover;
  height: 60vw;
}
.md .card {
  margin: 8px 0;
  box-shadow: none;
  -webkit-box-shadow: none;
}
.md .card-header a.link {
  text-align: left;
  text-transform: none;
  font-size: 12px;
  line-height: normal;
  height: auto;
  padding: 0;
  min-width: 44px;
}
.demo-card-header-pic .card-header {
  height: 40vw;
  background-size: cover;
  background-position: center;
  color: #fff;
}
.demo-card-header-pic .card-content-padding .date {
  color: #8e8e93;
}
.demo-facebook-card .card-header {
  display: block;
  padding: 10px;
}
.demo-facebook-card .demo-facebook-avatar {
  float: left;
}
.demo-facebook-card .demo-facebook-avatar img {
  border-radius: 50%;
}
.demo-facebook-card .demo-facebook-name {
  margin-left: 44px;
  font-size: 12px;
  font-weight: 500;
}
.demo-facebook-card .demo-facebook-date {
  margin-left: 44px;
  font-size: 11px;
  color: #8e8e93;
}
.demo-facebook-card .card-footer {
  justify-content: normal;
  padding: 0;
}
.theme-dark .demo-facebook-card .card-footer {
  background-color: transparent;
}
.demo-facebook-card .card-footer a.link {
  height: 25px;
}
.demo-facebook-card .card-content img {
  display: block;
}
.demo-facebook-card .card-content-padding {
  padding: 15px 10px;
}
.demo-facebook-card .card-content-padding .likes {
  color: #8e8e93;
}
</style>
