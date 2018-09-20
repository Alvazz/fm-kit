<template>
  <section class="section">
    <p v-if="loading" class="notification is-info">
      Loading
    </p>

    <template v-else>
      <h1 class="title">{{ page.title }}</h1>

      <article class="box">
        <div class="content">
          {{ page.body }}
        </div>
        <p>Posted by user <strong>{{ page.author }}</strong></p>
      </article>
    </template>
  </section>
</template>

<script>
export default {
  data() {
    return {
      page: {
        id: 1,
        author: 'Luca Di Gerlando',
        title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body:
        'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
      },
      loading: true
    }
  },
  mounted () {
    window.setTimeout(() =>{
      this.loading = false
    }, 2000);
  },
  watch: {
    $route: {
      immediate: true,
      handler($route) {}
    }
  }
}
</script>
