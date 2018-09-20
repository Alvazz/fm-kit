import { HeadGoverness } from 'vue-kindergarten'

export default class RouteGoverness extends HeadGoverness {
  guard(action, { next }) {
    // or your very own logic to redirect user
    // see. https://github.com/JiriChara/vue-kindergarten/issues/5 for inspiration
    return this.isAllowed(action) ? next() : next('/login')
  }
}
