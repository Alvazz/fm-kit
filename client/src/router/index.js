import Vue from 'vue'
import Router from 'vue-router'

import { createSandbox } from 'vue-kindergarten'
import RouteGoverness from '@/governesses/RouteGoverness'
import basePerimeter from '@/perimeters/basePerimeter'
import profilePerimeter from '@/perimeters/profilePerimeter'

// import { AclRule } from 'vue-acl'

import Home from '@/pages/Home'
import Dashboard from '@/pages/Admin/Dashboard'
import Test from '@/pages/Test'

import Admin from '@/pages/Admin/Dashboard'

import AdminHotelAdd from '@/pages/Admin/Hotels/Add'
import AdminHotelsList from '@/pages/Admin/Hotels/List'
import AdminHotelSingle from '@/pages/Admin/Hotels/Single'

import AdminItineraryAdd from '@/pages/Admin/Itineraries/Add'
import AdminItinerariesList from '@/pages/Admin/Itineraries/List'
import AdminItinerarySingle from '@/pages/Admin/Itineraries/Single'

import AdminDestinationAdd from '@/pages/Admin/Destinations/Add'
import AdminDestinationsList from '@/pages/Admin/Destinations/List'
import AdminDestinationSingle from '@/pages/Admin/Destinations/Single'

import AdminMediaList from '@/pages/Admin/Media/List'


import Post from '@/pages/Post'

import About from '@/pages/About'
import Photo from '@/pages/Photos'

import Login from '@/pages/User/Login'
import Register from '@/pages/User/Register'
import UserList from '@/pages/User/UserList'
import Profile from '@/pages/User/Profile'
import EditProfile from '@/pages/User/EditProfile'

import CreateItem from '@/pages/Items/CreateItem'
import Item from '@/pages/Items/Item'
import ItemList from '@/pages/Items/ItemList'

import DestinationsList from '@/pages/Destinations/List'
import DestinationSingle from '@/pages/Destinations/Single'

import HotelsList from '@/pages/Hotels/List'
import HotelSingle from '@/pages/Hotels/Single'

import ItinerariesList from '@/pages/Itineraries/List'
import ItinerarySingle from '@/pages/Itineraries/Single'

import Contacts from '@/pages/Contacts'

import child from '@/child'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        layout: 'full'
      },
      component: Home
    },
    {
      path: '/destinazioni',
      name: 'destinazioni',
      meta: {
        layout: 'full',
      },
      component: DestinationsList
    },
    {
      path: '/destinazioni/:slug',
      name: 'destinationSingle',
      meta: {
        layout: 'full'
      },
      component: DestinationSingle
    },
    {
      path: '/hotels',
      name: 'hotels',
      meta: {
        layout: 'full',
      },
      component: HotelsList
    },
    {
      path: '/hotels/:slug',
      name: 'hotelSingle',
      meta: {
        layout: 'full'
      },
      component: HotelSingle
    },
    {
      path: '/itinerari',
      name: 'itineraries',
      meta: {
        layout: 'full',
      },
      component: ItinerariesList
    },
    {
      path: '/itinerari/:slug',
      name: 'itinerarySingle',
      meta: {
        layout: 'full'
      },
      component: ItinerarySingle
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        layout: 'full',
      },
      component: Test
    },
    {
      path: '/admin',
      name: 'dashboard',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: Dashboard
    },
    {
      path: '/admin/hotels',
      name: 'adminHotelsList',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminHotelsList
    },
    {
      path: '/admin/hotels/:slug',
      name: 'adminHotels',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminHotelSingle
    },
    {
      path: '/admin/hotels/add',
      name: 'adminHotelAdd',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminHotelAdd
    },
    {
      path: '/admin/itinerari',
      name: 'adminItinerariesList',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminItinerariesList
    },
    {
      path: '/admin/itinerari/:slug',
      name: 'adminItinerary',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminItinerarySingle
    },
    {
      path: '/admin/itinerari/add',
      name: 'adminItineraryAdd',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminItineraryAdd
    },
    {
      path: '/admin/destinazioni',
      name: 'adminDestinationsList',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminDestinationsList
    },
    {
      path: '/admin/destinazioni/:slug',
      name: 'adminDestionation',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminDestinationSingle
    },
    {
      path: '/admin/destinazioni/add',
      name: 'adminDestionationAdd',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminDestinationAdd
    },
    {
      path: '/media',
      name: 'adminMediaList',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminMediaList
    },
    {
      path: '/contatti',
      name: 'contacts',
      meta: {
        layout: 'full'
      },
      component: Contacts
    },
    {
      path: '/photos',
      name: 'photos',
      meta: {
        perimeter: profilePerimeter,
        perimeterAction: 'isLogged'
      },
      component: Photo
    },
    {
      path: '/about-us',
      name: 'about',
      meta: {
        // layout: 'full'
        // rule: 'isPublic'
      },
      component: About
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: Admin
    },
    {
      path: '/items/add-item',
      name: 'addItem',
      meta: {
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: CreateItem
    },
    {
      path: '/items',
      name: 'itemList',
      meta: {
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: ItemList
    },
    {
      path: '/item/:id',
      name: 'item',
      meta: {
        layout: 'single',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: Item
    },
    {
      path: '/story/:id',
      name: 'post',
      meta: {      },
      component: Post
    },
    {
      path: '/user/:id',
      name: 'profile',
      meta: {
        // rule: 'isPublic'
        perimeter: profilePerimeter,
        perimeterAction: 'read'
      },
      props: true,
      component: Profile
    },
    {
      path: '/user/:id/edit',
      name: 'edit-profile',
      meta: {
        // rule: 'isLogged',
        perimeter: profilePerimeter,
        perimeterAction: 'own'
      },
      props: true,
      component: EditProfile
    },
    {
      path: '/user-list',
      name: 'user-list',
      meta: {
        layout: 'full'
        // rule: 'isPublic'
      },
      component: UserList
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'blank'
        // rule: 'isPublic'
      },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        layout: 'blank'
        // rule: 'isPublic'
      },
      component: Register
    },
    {
      path: '*',
      name: '404*',
      meta: {
        layout: 'full'
        // rule: 'isPublic'
      },
      component: require('@/pages/404.vue').default // load sync home
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  to.matched.some(routeRecord => {
    const perimeter = routeRecord.meta.perimeter
    const Governess = routeRecord.meta.governess || RouteGoverness
    const action = routeRecord.meta.perimeterAction || 'route'

    if (perimeter) {
      const sandbox = createSandbox(child(), {
        governess: new Governess(),

        perimeters: [perimeter]
      })

      return sandbox.guard(action, { to, from, next })
    }

    return next()
  })
})

export default router
