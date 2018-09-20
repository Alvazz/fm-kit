<template>
  <f7-page>
    <f7-swiper navigation class="external-swiper" :params="{speed:500, effect:'cube', slidesPerView: 1, spaceBetween: 20, }">
      <f7-swiper-slide v-for="(slider, index) in sliders" :key="index">
        <f7-swiper scrollbar class="internal-swiper" :class="['internal-' + index]" :params="{speed:500, slidesPerView: 1, autoplay: {delay: 5000 }, on:{reachEnd:lastSlider}, spaceBetween: 20}">
          <f7-swiper-slide v-for="(item, index) in slider.items" :key="index"> Slide int {{item.id}}</f7-swiper-slide>
        </f7-swiper>
      </f7-swiper-slide>
    </f7-swiper>
  </f7-page>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sliders: [
        {
          id: 1,
          name: 'test',
          items: [
            {
              id: 11,
              img: ''
            },
            {
              id: 12,
              img: ''
            }
          ]
        },
        {
          id: 2,
          name: 'test',
          items: [
            {
              id: 21,
              img: ''
            },
            {
              id: 22,
              img: ''
            },
            {
              id: 23,
              img: ''
            }
          ]
        }
      ]
    }
  },
  computed: {
    getSlider() {
      console.log(this.$refs)
    }
  },
  methods: {
    lastSlider() {
      var externalSwiper = document.querySelector('.external-swiper').swiper
      var mySwiper = document.querySelector('.internal-swiper').swiper

      console.log(
        'external',
        externalSwiper,
        externalSwiper.isEnd,
        externalSwiper.slides.length,
        externalSwiper.$el,
        externalSwiper.$wrapperEl
      )

      setTimeout(() => {
        externalSwiper.slideNext()
        mySwiper.slideTo(0)
      }, 5000)
    }
  }
}
</script>
<style>
.swiper-container.internal-swiper {
  height: 100vh;
  background: blue;
  color: #fff;
}
.swiper-container.external-swiper {
  height: 100vh;
  background: red;
}
</style>
