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

import AdminFlashAdd from '@/pages/Admin/Flashes/Add'
import AdminFlashesList from '@/pages/Admin/Flashes/List'
import AdminFlashSingle from '@/pages/Admin/Flashes/Single'

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

import FlashesList from '@/pages/Flashes/List'
import FlashSingle from '@/pages/Flashes/Single'

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
      path: '/flashes',
      name: 'flashes',
      meta: {
        layout: 'full',
      },
      component: FlashesList
    },
    {
      path: '/flashes/:slug',
      name: 'flashSingle',
      meta: {
        layout: 'full'
      },
      component: FlashSingle
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
      path: '/admin/flashes',
      name: 'adminFlashesList',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminFlashesList
    },
    {
      path: '/admin/flashes/:slug',
      name: 'adminFlash',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminFlashSingle
    },
    {
      path: '/admin/flashes/add',
      name: 'adminFlashAdd',
      meta: {
        layout: 'default',
        perimeter: profilePerimeter,
        perimeterAction: 'isAdmin'
      },
      component: AdminFlashAdd
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
