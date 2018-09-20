import { createSandbox } from 'vue-kindergarten'
import RouteGoverness from '@/governesses/RouteGoverness'
import basePerimeter from '@/perimeters/basePerimeter'
import profilePerimeter from '@/perimeters/profilePerimeter'

import HomePage from '@/pages/home.vue'
import TabbarPage from '@/pages/tabbar.vue'
import SearchPage from '@/pages/search.vue'
import AccountPage from '@/pages/account.vue'
import AboutPage from '@/pages/about.vue'
import FormPage from '@/pages/form.vue'
import ItemPage from '@/pages/item.vue'
import ProfilePage from '@/pages/user/profile.vue'
import AddUserPage from '@/pages/user/add-user.vue'
import CalendarPage from '@/pages/calendar-page.vue'
import LoginPage from '@/pages/login.vue'
import StoriesPage from '@/pages/stories.vue'

import DynamicRoutePage from '@/pages/dynamic-route.vue'
import NotFoundPage from '@/pages/not-found.vue'

import PanelLeftPage from '@/pages/panel-left.vue'
import PanelRightPage from '@/pages/panel-right.vue'

import child from '@/child'

const router = [
  {
    path: '/',
    // component: TabbarPage,
    async (routeTo, routeFrom, resolve) {
      if (child() !== null) {
        resolve({ path: '/home/', component: TabbarPage })
      } else {
        resolve({
          path: '/login/',
          component: LoginPage,
          options: {
            animate: false
          }
        })
      }
    }
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage
  },
  {
    path: '/panel-right/',
    component: PanelRightPage
  },
  {
    path: '/home/',
    component: TabbarPage
  },
  {
    path: '/search/',
    component: SearchPage
  },
  {
    path: '/about/',
    component: AboutPage,
    meta: {
      perimeter: profilePerimeter,
      perimeterAction: 'isLogged'
    }
  },
  {
    path: '/form/',
    component: FormPage
  },
  {
    path: '/account/',
    component: AccountPage
  },
  {
    path: '/item/:id',
    component: ItemPage
  },
  {
    path: '/profile/:id',
    component: ProfilePage
  },
  {
    path: '/add-user/:id',
    component: AddUserPage
  },
  {
    path: '/calendar-page/',
    component: CalendarPage
  },
  {
    path: '/login/',
    component: LoginPage
  },
  {
    path: '/stories/',
    component: StoriesPage
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage
  },
  {
    path: '(.*)',
    component: NotFoundPage
  }
]
export default router
