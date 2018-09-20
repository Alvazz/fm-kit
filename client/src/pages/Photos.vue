<template>
  <div class="section">
    <p v-if="loading" class="notification is-info">
      Loading
    </p>

    <template v-else>
      <h1 class="title">Look at my photos</h1>
      
      <article v-for="photo in photos" :key="photo.id" class="box has-text-centered">
        <h2 class="title is-3">
          <router-link :to="{name: 'photo', params: {id: photo.id}}">{{ photo.title }}</router-link>
        </h2>
        <div class="content">
          <img :src="photo.thumbnailUrl" :alt="photo.title"/>
        </div>
      </article>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      photos: null
    }
  },
  created() {}
}
</script>
