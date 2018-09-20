<template>
  <f7-page class="grid-demo" infinite :infinite-distance="0" :infinite-preloader="showPreloader" @infinite="loadMore" ptr @ptr:refresh="pullToRefresh">
    <f7-navbar>
      <f7-nav-title>{{getCurrentUser.username}}</f7-nav-title>
      <f7-nav-right>
        <f7-link href="/" :animate="false" icon-ios="f7:email_fill" icon-md="material:history"></f7-link>
        <f7-link href="/" :animate="false" icon-ios="f7:email_fill" icon-md="material:bookmark_border"></f7-link>
        <f7-link href="/" :animate="false" icon-ios="f7:email_fill" icon-md="material:format_list_bulleted"></f7-link>
        <f7-link :href="`/add-user/${getCurrentUser.id}`" :animate="true" icon-ios="f7:email_fill" icon-md="material:person_add"></f7-link>
        <f7-link icon-ios="f7:email_fill" icon-md="material:more_horiz" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar tabbar labels :bottom-md="isBottom">
      <f7-link href="/" :animate="false" text="Tab 1" icon-ios="f7:email_fill" icon-md="material:flash_on"></f7-link>
      <f7-link href="/search/" :animate="false" text="Tab 2" icon-ios="f7:heart" icon-md="material:search"></f7-link>
      <f7-link href="/calendar-page/" :animate="false" text="Tab 3" icon-ios="f7:today_fill" icon-md="material:today"></f7-link>
      <f7-link href="/account/" :animate="false" text="Tab 4" icon-ios="f7:today_fill" icon-md="material:person"></f7-link>
    </f7-toolbar>
    <f7-block v-show="false">
      <p>Columns within a row are automatically set to have equal width. Otherwise you can define your column with pourcentage of screen you want.</p>
    </f7-block>
    <f7-block>
      <f7-row no-gap>
        <f7-col width="30">
          <div class="user-avatar">
            <avatar :username="getCurrentUser.username" :size="80"></avatar>
            <div class="circle-icon">
              <f7-icon ios="f7:edit" md="material:edit"></f7-icon>
            </div>
          </div>
        </f7-col>
        <f7-col width="70">
          <f7-row no-gap class="stats">
            <f7-col width="30">
              <div class="count">
                34 MLD
              </div>
              <small>Post</small>
            </f7-col>
            <f7-col width="30">
              <div class="count">
                344 MLD
              </div>
              <small>Follower</small>
            </f7-col>
            <f7-col width="30">
              <div class="count">
                340 MLD
              </div>
              <small>Seguiti</small>
            </f7-col>
            <f7-col width="100">
              <f7-button big small fill>Segui</f7-button>
            </f7-col>
          </f7-row>
        </f7-col>
      </f7-row>
      <f7-row no-gap>
        <f7-col width="100">
          <p v-show="false"><b>{{getCurrentUser.username}}</b></p>
          <p class="description">Columns within a row are automatically set to have equal width. Otherwise you can define your column with pourcentage of screen you want.</p>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-row no-gap class="layout-menu">
      <f7-col width="33">
        <f7-link @click="showGrid" :animate="false" icon-ios="f7:email_fill" icon-md="material:grid_on"></f7-link>
      </f7-col>
      <f7-col width="33">
        <f7-link @click="showList" :animate="false" icon-ios="f7:email_fill" icon-md="material:view_day"></f7-link>
      </f7-col>
      <f7-col width="33">
        <f7-link href="/" :animate="false" icon-ios="f7:email_fill" icon-md="material:assignment_ind"></f7-link>
      </f7-col>
    </f7-row>
    <f7-row no-gap class="grid-view" v-show="grid === true">
      <f7-col width="33" v-for="(item, i) in sortItems" :key="i">
          <img :src="item.cover" width="100%"/>
      </f7-col>
    </f7-row>
    <f7-row no-gap v-show="list === true">
      <f7-col>
        <CardList :items="sortItems"/>
      </f7-col>
    </f7-row>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7BlockTitle,
  f7Row,
  f7Col,
  f7Block
} from 'framework7-vue'
import jwt_decode from 'jwt-decode'
import API from '@/api'
import profilePerimeter from '@/perimeters/profilePerimeter'
import uuid from 'uuid'
import Avatar from 'vue-avatar'
import CardList from '@/components/card-list'

export default {
  components: {
    Avatar,
    CardList,
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7Row,
    f7Col,
    f7Block
  },
  data() {
    return {
      isBottom: true,
      grid: true,
      list: false,
      more: false,
      items: [
        {
          id: uuid(),
          title: 'Yellow Submarine',
          user: {
            pic:'https://randomuser.me/api/portraits/women/49.jpg',
            username: 'MariaTest'
          },
          type: 'post',
          cover: 'https://source.unsplash.com/user/erondu',
          source: '',
          geo: {
            name: 'Duomo di Milano',
            coords: {
              lat: 45.4640976,
              lng: 9.1919265
            }
          },
          follower: [],
          comments: [],
          createdAt: new Date('2018-02-28').getTime(),
          startAt: new Date('2018-05-28').getTime(),
          status: 'new'
        },
        {
          id: uuid(),
          title: "Don't Stop Me Now",
          user: {
            pic:'https://randomuser.me/api/portraits/women/60.jpg',
            username: 'MariaTest'
          },
          type: 'post',
          cover: 'https://source.unsplash.com/user/erondu',
          source: '',
          geo: {
            name: 'Duomo di Milano',
            coords: {
              lat: 45.4640976,
              lng: 9.1919265
            }
          },
          follower: [],
          comments: [],
          createdAt: new Date('2018-01-28').getTime(),
          startAt: new Date('2018-07-28').getTime(),
          status: 'new'
        }
      ],
      names: [
        'Yellow Submarine',
        "Don't Stop Me Now",
        'Billie Jean',
        'Californication'
      ],
      cities: ['Berlin', 'Rome', 'New York', 'Palerno'],
      allowInfinite: true,
      showPreloader: false
    }
  },
  computed: {
    getCurrentUser() {
      return jwt_decode(sessionStorage.getItem('token'))
    },
    sortItems() {
      return this.items.sort((a, b) => {
        console.log(a, b)
              if (a.createdAt < b.createdAt) return -1
              if (a.createdAt > b.createdAt) return 1
              return 0
            })
    }
  },
  methods: {
    showGrid(){
      this.grid = true
      this.list = false
      this.more = false
    },
    showList(){
      this.grid = false
      this.list = true
      this.more = false
    },
    showMore(){
      this.grid = false
      this.list = false
      this.more = true
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
        const createdAt = new Date().getTime()
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
      console.log('scroll')
      const self = this
      self.showPreloader = true
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
        const startAt = new Date('2018-07-28').getTime()
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
<style scoped>
.md .navbar .title {
  font-size: 16px;
  font-weight: bold;
}
.md .navbar a.link {
  padding: 0 6px;
}
.user-avatar {
  position: relative;
}

.user-avatar .circle-icon {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #000;
  border-radius: 50%;
  font-size: 12px;
  border: 2px solid #fff;
  bottom:  0;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-avatar .circle-icon i {
  font-size: 14px;
  color: #fff;
}
.stats {
  text-align: center;
}
.stats .count {
  font-weight: bold;
  line-height: normal;
  font-size: 16px;
}
.stats small {
  font-weight: lighter;
  line-height: 10px;
}
.stats .button {
  margin-top: 5px;
  text-transform: capitalize;
  font-weight: bold;
}
.description {
  font-size: 12px;
}
.layout-menu {
  border-top: 1px solid #e2e2e2;
  text-align: center;
}

.layout-menu a.link {
  padding: 8px;
}
.grid-view.row {
  justify-content: flex-start !important;
}
img {
  width: 100%;
  vertical-align: bottom;
  padding: 1px;
  box-sizing: border-box;
}
</style>
