<template>
  <f7-page>
    <f7-navbar>
      <f7-link panel-open="left">
        <avatar :username="getCurrentUser.username" :size="35"></avatar>
      </f7-link>
      <f7-nav-title>Searchbar</f7-nav-title>
      <f7-nav-right>
      </f7-nav-right>
      <f7-subnavbar :inner="false">
        <f7-searchbar
          search-container=".search-list"
          search-in=".item-title"
        ></f7-searchbar>
      </f7-subnavbar>
    </f7-navbar>
    <f7-toolbar tabbar labels :bottom-md="isBottom">
      <f7-link href="/" :animate="false" text="Tab 1" icon-ios="f7:email_fill" icon-md="material:flash_on"></f7-link>
      <f7-link href="/search/" :animate="false" text="Tab 2" icon-ios="f7:heart" icon-md="material:search"></f7-link>
      <f7-link href="/calendar-page/" :animate="false" text="Tab 3" icon-ios="f7:today_fill" icon-md="material:today"></f7-link>
      <f7-link href="/account/" :animate="false" text="Tab 4" icon-ios="f7:today_fill" icon-md="material:account_circle"></f7-link>
    </f7-toolbar>
    <f7-list class="searchbar-not-found">
      <f7-list-item title="Nothing found"></f7-list-item>
    </f7-list>
    <f7-list class="search-list searchbar-found">
      <f7-list-item title="Acura"></f7-list-item>
      <f7-list-item title="Audi"></f7-list-item>
      <f7-list-item title="BMW"></f7-list-item>
      <f7-list-item title="Cadillac "></f7-list-item>
      <f7-list-item title="Chevrolet "></f7-list-item>
      <f7-list-item title="Chrysler "></f7-list-item>
      <f7-list-item title="Dodge "></f7-list-item>
      <f7-list-item title="Ferrari "></f7-list-item>
      <f7-list-item title="Ford "></f7-list-item>
      <f7-list-item title="GMC "></f7-list-item>
      <f7-list-item title="Honda"></f7-list-item>
      <f7-list-item title="Hummer"></f7-list-item>
      <f7-list-item title="Hyundai"></f7-list-item>
      <f7-list-item title="Infiniti "></f7-list-item>
      <f7-list-item title="Isuzu "></f7-list-item>
      <f7-list-item title="Jaguar "></f7-list-item>
      <f7-list-item title="Jeep "></f7-list-item>
      <f7-list-item title="Kia"></f7-list-item>
      <f7-list-item title="Lamborghini "></f7-list-item>
      <f7-list-item title="Land Rover"></f7-list-item>
      <f7-list-item title="Lexus "></f7-list-item>
      <f7-list-item title="Lincoln "></f7-list-item>
      <f7-list-item title="Lotus "></f7-list-item>
      <f7-list-item title="Mazda"></f7-list-item>
      <f7-list-item title="Mercedes-Benz"></f7-list-item>
      <f7-list-item title="Mercury "></f7-list-item>
      <f7-list-item title="Mitsubishi"></f7-list-item>
      <f7-list-item title="Nissan "></f7-list-item>
      <f7-list-item title="Oldsmobile "></f7-list-item>
      <f7-list-item title="Peugeot "></f7-list-item>
      <f7-list-item title="Pontiac "></f7-list-item>
      <f7-list-item title="Porsche"></f7-list-item>
      <f7-list-item title="Regal"></f7-list-item>
      <f7-list-item title="Saab "></f7-list-item>
      <f7-list-item title="Saturn "></f7-list-item>
      <f7-list-item title="Subaru "></f7-list-item>
      <f7-list-item title="Suzuki "></f7-list-item>
      <f7-list-item title="Toyota"></f7-list-item>
      <f7-list-item title="Volkswagen"></f7-list-item>
      <f7-list-item title="Volvo"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7Searchbar,
  f7Subnavbar,
  f7List,
  f7ListItem
} from 'framework7-vue'
import jwt_decode from 'jwt-decode'
import Avatar from 'vue-avatar'
export default {
  components: {
    Avatar,
    f7Navbar,
    f7Page,
    f7Searchbar,
    f7Subnavbar,
    f7List,
    f7ListItem
  },
  data() {
    return {
      isBottom: true
    }
  },
  computed: {
    getCurrentUser() {
      return jwt_decode(sessionStorage.getItem('token'))
    }
  }
}
</script>
