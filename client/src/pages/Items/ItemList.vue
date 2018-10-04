<template>
  <div class="section">
    <p v-if="loading" class="notification is-info">
      Loading
    </p>
    <template v-else>
      <h1 class="title">Items List</h1>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <router-link :to="{name: 'item', params: { id: item._id } }">
            {{item.title}}
          </router-link>
          <img :src="`http://localhost:3000/${item.cover}`"/>
        </li>
      </ul>
    </template>
    <Observer @intersect="intersected"/>
  </div>
</template>

<script>
import API from '@/api'
import Observer from '@/components/Observer'

export default {
  name: 'UserList',
  components: {
    Observer
  },
  data() {
    return {
      loading: true,
      items: [],
      page: 0,
      limit: 12,
      total: 0
    }
  },
  created() {},
  methods: {
    intersected() {
      if (this.items.length === 0 || this.items.length < this.total) {
        API.get('items?page=' + this.page + '&limit=' + this.limit)
          .then(response => {
            const items = response.data.items
            this.total = response.data.total
            this.page++
            this.items = [...this.items, ...items]
            console.log(this.items)
            this.loading = false
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
</style>
