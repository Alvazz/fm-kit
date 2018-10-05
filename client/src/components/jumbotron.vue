<template lang="">
  <div class="card">
    <div class="jumbotron" style="background-image:url('https://images.unsplash.com/photo-1526244434298-88fcbcb066b5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eb4f6ac5cbdc49470737bb95f8e5893f&auto=format&fit=crop&w=1400&q=80')">
      <div class="">
        <div class="jumbotron--tag">
          finace
        </div>
        <div class="jumbotron--text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
        <div class="jumbotron--icon">
          <i class="fa fa-500px"></i> 123 <i class="fa fa-500px"></i> 56 <i class="fa fa-500px"></i> 32
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.jumbotron {
  text-align: center;
  min-height: 456px;
  margin-bottom: 0;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
}
.jumbotron--tag {
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
.jumbotron--text, .jumbotron--icon {
  text-shadow: 1px 1px #000;
  padding: 10px;
  color: #fff;
}
</style>
