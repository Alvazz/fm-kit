<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
const defaultLayout = 'default'
import API from '@/api'
export default {
  name: 'App',
  created() {
    API.get('destinations')
    .then(response => {
      console.log(response)
      this.$store.dispatch('setDestinations',response.data.set)
    })
    .catch(e => {
      console.log(e)
    })
    API.get('hotels')
    .then(response => {
      console.log(response)
      this.$store.dispatch('setHotels',response.data.set)
    })
    .catch(e => {
      console.log(e)
    })
    API.get('itineraries')
    .then(response => {
      console.log(response)
      this.$store.dispatch('setItineraries',response.data.set)
    })
    .catch(e => {
      console.log(e)
    })
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Barlow+Semi+Condensed|Cormorant+Garamond|Dancing+Script|IM+Fell+English+SC|Josefin+Sans|Raleway');

#app {
}

a {
  color: #FFC200;
}
a:hover {
  color: rgba(	0, 0, 34 , 0.7);
  text-decoration: none;
}
p {
  font-family: 'Cormorant Garamond', serif;
}
h1 {
  font-family: 'Josefin Sans', sans-serif;
  text-align: center;
}
h4 {
  font-family: "Dancing Script", serif;
  text-align: center;
}
h2 {
  font-family: 'IM Fell English SC', serif;
  text-transform: lowercase;
}

.form-control:focus {
  box-shadow: 0 0 0 0rem rgba(0, 123, 255, 0.25);
}

.btn-generic {
  text-align: center;
  margin: auto;
}
input.search-input {
  background-color: rgba(	255, 255, 255 , 0.7);
  border-radius: 5px;
  border: 1px solid white;
  margin: 0 5px;
}
input.search-input::placeholder {
  color: rgba(255, 255, 255 , 0.7);
  text-transform:capitalize;
  padding-left: 5px;
}
button.search-submit {
  background-color: transparent;
  border: 0;
}
.navbar {
  margin: 0px;
}
.line {
  border: 1px solid rgba(	0, 0, 34 , 1);
  width: 10%;
}
.btn-full {
  border: 2px solid transparent;
  background-color: rgba(	0, 0, 34,1);
  color: #ffffff;
  border-radius: 50px;
}
.btn-full:hover {
  background-color: #ffffff;
  border: 2px solid rgba(	0, 0, 34,1);
  color: rgba(	0, 0, 34,1);
  border-radius: 50px;
  transition: 0.3s;
}
.cta_itinerari .card-footer:hover {
  background-color: #ffffff;
  border: 2px solid rgba(	0, 0, 34,1);
  color: rgba(0, 0, 34,1)!important;
}
.cta_itinerari .card-footer {
  background-color: rgba(	0, 0, 34,1);
  border: 2px solid rgba(	0, 0, 34,1);
  color: #ffffff;
  text-align: center;
}
.page-link {
  color: rgba(	0, 0, 34 ,1);
  border: 0;
  font-family: 'Cormorant Garamond', serif;
}
.page-item.active .page-link {
  background-color: rgba(	0, 0, 34 ,1);
  color: white;
  border-radius: 10px;
}

.paginate-links {
  user-select: none;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
}

.paginate-links a {
  cursor: pointer;
  position: relative;
  display: block;
  padding: .5rem .75rem;
  margin-left: -1px;
  line-height: 1.25;
}

.paginate-links li.active a:hover {
  color: #fff;
}

.paginate-links li.active a {
  background-color: rgba(	0, 0, 34 ,1);
  color: white;
  border-radius: 10px;
  font-weight: bold;
}

.paginate-links li.next:before {
  content: ' | ';
  margin-right: 13px;
  color: #ddd;
}

.paginate-links li.disabled a {
  color: #ccc;
  cursor: no-drop;
}

.paginate-links li.disabled a:hover {
  color: #ccc;
  cursor: no-drop;
}

</style>
