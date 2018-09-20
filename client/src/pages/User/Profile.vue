<template>
  <div class="section">
    <h1 class="title">Profile</h1>
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{user.username}}</strong> <small>@{{user.role}}</small> <small>31m</small>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
            </div>
            <div class="level-right">
              <router-link class="level-item" aria-label="edit" v-show="$profile.isAllowed('update', user)" :to="{ name: 'edit-profile', params: {id: user._id} }">
                <span class="icon is-small">
                  <i class="fas fa-edit" aria-hidden="true"></i>
                </span>
              </router-link>
              <a class="level-item" aria-label="trash" v-show="$profile.isAllowed('destroy', user)" @click="deleteUser">
                <span class="icon is-small has-text-danger ">
                  <i class="fas fa-trash" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
    <div class="box" v-show="getItemByUser.length > 0">
      <article class="media" v-for="(item, index) in getItemByUser">
        <div class="media-left">
          <figure class="image is-64x64">
            <img :src="`http://localhost:3000/${item.cover}`" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <router-link :to="{name: 'item', params: {id: item._id} }">
                <strong>{{item.title}}</strong>
              </router-link>
              <small>@{{item.status}}</small>
              <small> {{ $d(new Date(item.createAt ), 'short') }}</small>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
            </div>
            <div class="level-right">
              <router-link class="level-item" aria-label="edit" v-show="$profile.isAllowed('update', item.author)" :to="{name: 'item', params: {id: item._id} }">
                <span class="icon is-small">
                  <i class="fas fa-edit" aria-hidden="true"></i>
                </span>
              </router-link>
              <a class="level-item" aria-label="trash" v-show="$profile.isAllowed('destroy', item.author)" @click="deleteItem(item._id)">
                <span class="icon is-small has-text-danger ">
                  <i class="fas fa-trash" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import API from '@/api'
import jwt_decode from 'jwt-decode'
import profilePerimeter from '@/perimeters/profilePerimeter'

export default {
  name: 'UserList',
  data () {
    return {
      user: ''
    }
  },
  created () {
    API.get('user/'+this.$route.params.id, this.form)
    .then(response => {
      this.user = response.data
    })
    .catch(e => {
      console.log(e)
    })
  },
  computed: {
    getItemByUser(){
      return this.$store.getters.getItemByUser(this.$route.params.id)
    }
  },
  perimeters: [
    profilePerimeter
  ],
  methods: {
    deleteItem(id){
      API.delete('items/'+id)
      .then(res => {
        console.log('it works')
        this.$store.dispatch('deleteItem', id)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    deleteUser () {
      const self = this
      API.delete('user/'+this.$route.params.id)
      .then(res => {
        console.log(res)
        console.log('it works')
        self.$router.go(-1)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>
