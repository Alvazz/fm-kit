<template lang="">
  <div class="card">
    <div class="info-box" style="background-image:url('https://images.unsplash.com/photo-1534491539225-5ae494cd2740?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=96c5dac004debbfe277a62b897e98f86&auto=format&fit=crop&w=1350&q=80')">
        <div class="info-box--tag">
          finace
        </div>
        <div class="info-box--text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
        <div class="info-box--icon">
          <i class="fa fa-500px"></i> 123 <i class="fa fa-500px"></i> 56 <i class="fa fa-500px"></i> 32
        </div>
      </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>

.info-box {
  min-height: 213px;
  background-size: cover;
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
  font-size: 12px
}
.info-box--text, .info-box--icon {
  text-shadow: 1px 1px #000;
  padding: 10px;
  color: #fff;
}
</style>
