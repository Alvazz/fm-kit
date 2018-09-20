import { HeadGoverness } from 'vue-kindergarten'

export default class RouteGoverness extends HeadGoverness {
  guard (action, { resolve }) {
    // or your very own logic to redirect user
    // see. https://github.com/JiriChara/vue-kindergarten/issues/5 for inspiration
    if (this.isAllowed(action)) {
      return resolve()
    } else {
      return resolve('/login')
    }
  }
}
