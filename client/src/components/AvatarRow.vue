<template>
  <div class="user-row">
    <div class="col-avatar">
      <avatar :username="title" :size="size"></avatar>
    </div>
    <div class="col-name">
      <div>
        <a href="javascript:void(0)" class="text-inherit">{{title}}</a>
      </div>
      <small class="has-text-grey-light">{{subtitle}}</small>
    </div>
    <div class="col-action">
      <div class="item-action dropdown">
        <a href="javascript:void(0)" class="icon"><i class="fas" :class="icon"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  props: ['title', 'subtitle', 'icon', 'size'],
  components: {
    Avatar
  }
}
</script>

<style scoped>
.user-row {
  display: flex;
  justify-content: space-between;
  line-height: 18px;
  width: 100%;
}
.user-row .col-avatar {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 10%;
}

.user-row .col-name {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 70%;
}

.user-row .col-action {
}
</style>
