<template lang="html">
  <div class="card-box">
    <div class="card-aside" style="background-image:url('https://tabler.github.io/tabler/demo/photos/david-marcu-114194-500.jpg')"></div>
    <div class="card-body">
      <h6 class="title is-6 is-marginless">And this isn't my nose. This is a false one.</h6>
      <small class="text-muted">Look, my liege! The Knights Who Say Ni demand a sacrifice! …Are you suggesting that coconuts migr...</small>
      <avatar-row title="Ronald Bradley" subtitle="amanda_hunt@example.com" icon="fa-heart" :size="40" class="m-t-20"/>
    </div>
  </div>
</template>

<script>
import AvatarRow from '@/components/AvatarRow'

export default {
  components: {
    AvatarRow
  }
}
</script>

<style scoped>
.card-box {
  display: flex;
}
.card-aside {
  min-width: 5rem;
  width: 30%;
  -ms-flex: 0 0 30%;
  flex: 0 0 30%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background: no-repeat center/cover;
}
.card-body {
  flex: 1 1 auto;
  margin: 0;
  padding: 1.5rem 1.5rem;
  position: relative;
}
</style>
