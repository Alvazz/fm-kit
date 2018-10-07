<template lang="">
  <router-link :to="{ name: 'flashSingle', params: {slug: 'Lorem'} }" class="card">
    <div class="info-box" style="background-image:url('https://images.unsplash.com/photo-1534491539225-5ae494cd2740?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=96c5dac004debbfe277a62b897e98f86&auto=format&fit=crop&w=1350&q=80')">
        <div class="info-box--tag">
          finace
        </div>
        <div class="info-box--text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
        <div class="info-box--icon">
          <i class="far fa-thumbs-up"></i> 123 <i class="far fa-comments"></i> 34
        </div>
      </div>
  </router-link>
</template>

<script>
export default {
}
</script>

<style>

.info-box {
  min-height: 213px;
  background-size: cover;
  border-radius: 0.25rem;
  border: 0px solid transparent;
}

.info-box--tag {
  margin:20px 0;
  padding: 6px 20px;
  display: inline-block;
  background: red;
  text-transform: uppercase;
  font-family: 'Lato', sans-serif;
  color: #fff;
  font-weight: bold;
  font-size: .8rem
}

.info-box--text {
  text-shadow: 1px 1px #000;
  padding: 10px;
  font-size: 1.2rem;
  color: #fff;
}

.info-box--icon {
  text-shadow: 1px 1px #000;
  padding: 10px;
  position: absolute;
  bottom: 10px;
  color: #fff;
}
</style>
