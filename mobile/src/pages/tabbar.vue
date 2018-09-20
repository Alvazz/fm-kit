<template>
  <f7-page  infinite :infinite-distance="0" :infinite-preloader="showPreloader" @infinite="loadMore" ptr @ptr:refresh="pullToRefresh">
    <f7-navbar>
      <f7-nav-left>
        <f7-link panel-open="left">
          <avatar :username="getCurrentUser.username" :size="35"></avatar>
        </f7-link>
      </f7-nav-left>
      <f7-nav-title>My App</f7-nav-title>
      <f7-nav-right>
        <f7-link v-show="$profile.isAllowed('isAdmin')" icon-if-ios="f7:menu" icon-if-md="material:settings" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar tabbar labels :bottom-md="isBottom">
      <f7-link href="/" :animate="false" text="Tab 1" icon-ios="f7:email_fill" icon-md="material:flash_on"></f7-link>
      <f7-link href="/search/" :animate="false" text="Tab 2" icon-ios="f7:heart" icon-md="material:search"></f7-link>
      <f7-link href="/calendar-page/" :animate="false" text="Tab 3" icon-ios="f7:today_fill" icon-md="material:today"></f7-link>
      <f7-link href="/account/" :animate="false" text="Tab 4" icon-ios="f7:today_fill" icon-md="material:person_outline"></f7-link>
    </f7-toolbar>
    <f7-block class="up-slider">
      <f7-swiper :params="{speed:500, slidesPerView: 4.3, spaceBetween: 10}">
        <f7-swiper-slide>
          <div class="avatar-content">
            <avatar :username="getCurrentUser.username" :size="50"></avatar>
            <div class="circle-icon">
              <f7-icon ios="f7:plus" md="material:add"></f7-icon>
            </div>
          </div>
          <div class="truncate">La tua storia</div>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <div class="avatar-content">
            <avatar :username="getCurrentUser.username" :size="50"></avatar>
          </div>
          <div class="truncate">{{getCurrentUser.username}}</div>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <div class="avatar-content">
            <avatar :username="getCurrentUser.username" :size="50"></avatar>
          </div>
          <div class="truncate">{{getCurrentUser.username}}</div>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <div class="avatar-content">
            <avatar :username="getCurrentUser.username" :size="50"></avatar>
          </div>
          <div class="truncate">{{getCurrentUser.username}}</div>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <div class="avatar-content">
            <avatar :username="getCurrentUser.username" :size="50"></avatar>
          </div>
          <div class="truncate">{{getCurrentUser.username}}</div>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <div class="avatar-content">
            <avatar :username="getCurrentUser.username" :size="50"></avatar>
          </div>
          <div class="truncate">{{getCurrentUser.username}}</div>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <div class="avatar-content">
            <avatar :username="getCurrentUser.username" :size="50"></avatar>
          </div>
          <div class="truncate">{{getCurrentUser.username}}</div>
        </f7-swiper-slide>
      </f7-swiper>
    </f7-block>
    <CardList :items="sortItems"/>
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
import jwt_decode from 'jwt-decode'
import API from '@/api'
import profilePerimeter from '@/perimeters/profilePerimeter'
import uuid from 'uuid'
import Avatar from 'vue-avatar'
import CardList from '@/components/card-list'

export default {
  data() {
    return {
      isBottom: true,
      flashed: [],
      page: 0,
      limit: 12,
      total: 0,
      items:[],
      showList: false,
      names: [
        'Yellow Submarine',
        "Don't Stop Me Now",
        'Billie Jean',
        'Californication'
      ],
      cities: ['Berlin', 'Rome', 'New York', 'Palerno'],
      allowInfinite: true,
      showPreloader: true
    }
  },
  beforeCreate() {
    API.get('items')
      .then(response => {
        const items = response.data.items
        this.items = [...this.items, ...items]
        this.showList = true
      })
      .catch(e => {
        console.log(e)
      })
  },
  perimeters: [profilePerimeter],
  components: {
    Avatar,
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
  computed: {
    sortItems() {
      return this.items.sort((a, b) => {
              if (new Date(a.startAt).getTime() < new Date(b.startAt).getTime()) return -1
              if (new Date(a.startAt).getTime() > new Date(b.startAt).getTime()) return 1
              return 0
            })
    },
    isLogged() {
      return this.$store.getters.isLogged
    },
    getCurrentUser() {
      return jwt_decode(sessionStorage.getItem('token'))
    },
    displayLocale() {
      let other = 'Traduci in Italiano'
      if (this.$i18n.locale === 'it') {
        other = 'Translate in English'
      }
      return other
    }
  },
  methods: {
    intersected() {
      if (this.items.length === 0 || this.items.length < this.total) {
        API.get('items?page=' + this.page + '&limit=' + this.limit)
          .then(response => {
            const items = response.data.items
            this.total = response.data.total
            this.page++
            this.items = [...this.items, ...items]
            this.loading = false
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        this.loading = false
      }
    },
    toggleToolbarPosition() {
      this.$$(this.$el)
        .find('.toolbar, .tabbar')
        .toggleClass('toolbar-bottom-md')
    },
    isFlashed(id) {
      return this.flashed.includes(id)
    },
    flashToggle(id) {
      this.flashed.includes(id)
        ? this.flashed.splice(this.flashed.indexOf(id), 1)
        : this.flashed.push(id)
    },
    logout() {
      this.$store.dispatch('removeToken')
    },
    pullToRefresh(event, done) {
      const self = this
      setTimeout(() => {
        const picUser = `https://randomuser.me/api/portraits/women/${Math.round(
          Math.random() * 10
        )}.jpg`
        const picCover = `https://source.unsplash.com/user/erondu.jpg`
        const name = self.names[Math.floor(Math.random() * self.names.length)]
        const city = self.cities[Math.floor(Math.random() * self.cities.length)]
        const id = Math.round(Math.random() * 10)
        const createdAt = new Date()
        const startAt = new Date('2018-07-28').getTime()
        self.items.push({
          id: uuid(),
          geo: {
            name: city,
            coords: {
              lat: 45.4640976,
              lng: 9.1919265
            }
          },
          user: {
            pic: picUser,
            username: 'MariaTest'
          },
          createdAt: createdAt,
          startAt: startAt,
          title: title,
          cover: picCover,
          status: 'new',
          type: 'post',
        })
        done()
      }, 1000)
    },
    loadMore() {
      const self = this
      if (!self.allowInfinite) return
      self.allowInfinite = false
      setTimeout(() => {
        if (self.items.length >= 200) {
          self.showPreloader = false
          return
        }

        const picUser = `https://randomuser.me/api/portraits/women/${Math.round(
          Math.random() * 10
        )}.jpg`
        const picCover = `https://source.unsplash.com/user/erondu.jpg`
        const createdAt = new Date().getTime()
        const startAt = new Date('2018-07-28')
        const title = self.names[Math.floor(Math.random() * self.names.length)]
        const city = self.cities[Math.floor(Math.random() * self.cities.length)]
        const id = Math.round(Math.random() * 10)

        for (let i = 1; i <= 3; i += 1) {
          self.items.push({
            id: uuid(),
            geo: {
              name: city,
              coords: {
                lat: 45.4640976,
                lng: 9.1919265
              }
            },
            user: {
              pic: picUser,
              username: 'MariaTest'
            },
            createdAt: createdAt,
            startAt: startAt,
            title: title,
            cover: picCover,
            status: 'new',
            type: 'post',
          })
        }
        self.allowInfinite = true
      }, 100)
    }
  }
}
</script>
<style>
.md .block.up-slider {
  padding: 0 0 16px 8px;
  border-bottom: 1px solid #c2c2c2;
  margin: 16px 0;
}
.md .block.up-slider .avatar-content {
  display: flex;
  justify-content: center;
}
.truncate {
  width: 75px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  padding-top: 5px;
  font-weight:lighter;
}
.avatar-content .circle-icon {
  position: absolute;
  width: 15px;
  height: 15px;
  background: #000;
  border-radius: 50%;
  font-size: 12px;
  border: 2px solid #fff;
  bottom:  20px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-content .circle-icon i {
  font-size: 14px;
  color: #fff;
  font-weight: bold;
}
.toolbar-inner a {
  justify-content: center;
}
.toolbar-inner a.link span {
  display: none !important;
}
</style>
