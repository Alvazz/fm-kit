<template>
  <section class="row background-image" style="background-image:url('https://source.unsplash.com/user/erondu');">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="wrapper">
          <div class="videbox">
            <p v-show="!play" class="video-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <video-player  class="vjs-custom-skin"
                              ref="videoPlayer"
                              :options="playerOptions"
                              :playsinline="true"
                              @play="onPlayerPlay($event)"
                              @pause="onPlayerPause($event)"
                              @ended="onPlayerEnded($event)"
                              @loadeddata="onPlayerLoadeddata($event)"
                              @waiting="onPlayerWaiting($event)"
                              @playing="onPlayerPlaying($event)"
                              @timeupdate="onPlayerTimeupdate($event)"
                              @canplay="onPlayerCanplay($event)"
                              @canplaythrough="onPlayerCanplaythrough($event)"
                              @ready="playerReadied"
                              @statechanged="playerStateChanged($event)">
               </video-player>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // videojs options
      play: false,
      playerOptions: {
        height: '360',
        width: '800',
        autoplay: false,
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          // mp4
          src: "http://vjs.zencdn.net/v/oceans.mp4",
          // webm
          // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        poster: "https://source.unsplash.com/user/erondu/",
      }
    }
  },
  mounted() {
    // console.log('this is current player instance object', this.player)
    setTimeout(() => {
      console.log('dynamic change options', this.player)
      // change src
      // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
      // change item
      // this.$set(this.playerOptions.sources, 0, {
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // })
      // change array
      // this.playerOptions.sources = [{
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // }]
      this.player.muted(false)
    }, 5000)
  },
  computed:{
    getFlashes() {
      return this.$store.getters.getFlashes
      .filter(
        el => el.slug === this.$route.params.slug
      )[0]
    },
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player)
      this.play = true
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      console.log('example player 1 readied', player)
      player.currentTime(10)
      // console.log('example 01: the player is readied', player)
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

.background-image::before {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100%;
  height: 100vh;

  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}

.background-image {
  min-height: 100vh;
  background-size: cover !important;
}

.wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.wrapper .videbox {
  height: 500px;
  width: 800px;
  background: #fff
}

.wrapper .video-title {
  position: absolute;
  z-index: 1;
  width: 800px;
  text-align: center;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 360px;
  color: #fff;
  padding: 150px;
  bottom: 40px;
}

.vjs-custom-skin>.video-js .vjs-big-play-button {
    top: 50%;
    left: 50%;
    margin-left: -1.5em;
    margin-top: -1em;
    background-color: rgba(0,0,0,.45);
    font-size: 3.5em;
    height: 2em!important;
    line-height: 2em!important;
    margin-top: -1em!important;
}
</style>
