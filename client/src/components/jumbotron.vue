<template lang="">
  <div class="card">
    <div class="jumbotron" style="background-image:url('https://images.unsplash.com/photo-1526244434298-88fcbcb066b5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eb4f6ac5cbdc49470737bb95f8e5893f&auto=format&fit=crop&w=1400&q=80')">
      <div class="">
        <div class="jumbotron--tag">
          finace
        </div>
        <div class="jumbotron--text">
          THIS TIE BRAND IS BUCKING THE RETAIL APOCALYPSE WHITH A MASSIVE STORE EXPANSION
        </div>
        <div class="jumbotron--subtext">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
        <div class="jumbotron--icon">
          <i class="far fa-thumbs-up"></i> 123 <i class="far fa-comments"></i> 34
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
  border-radius: 0.25rem;
  border: 0px solid transparent;
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
  font-size: 0.8rem
}
.jumbotron--text {
  text-shadow: 1px 1px #000;
  padding: 0 130px;
  font-size: 1.5rem;
  color: #fff;
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
}

.jumbotron--subtext {
  text-shadow: 1px 1px #000;
  padding: 0 150px;
  font-size: 1rem;
  color: #fff;
  font-family: 'Lato', sans-serif;
}


.jumbotron--icon {
  text-shadow: 1px 1px #000;
  padding: 10px;
  position: absolute;
  bottom: 30px;
  right: 0;
  left: 0;
  color: #fff;
}
</style>
