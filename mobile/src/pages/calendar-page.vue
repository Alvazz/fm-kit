<template>
  <f7-page :page-content="false" @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit">
    <f7-navbar>
      <f7-link panel-open="left">
        <avatar :username="getCurrentUser.username" :size="35"></avatar>
      </f7-link>
      <f7-nav-title class="navbar-calendar-title"></f7-nav-title>
      <f7-nav-right>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar tabbar labels :bottom-md="isBottom">
      <f7-link href="/" :animate="false" text="Tab 1" icon-ios="f7:email_fill" icon-md="material:flash_on"></f7-link>
      <f7-link href="/search/" :animate="false" text="Tab 2" icon-ios="f7:heart" icon-md="material:search"></f7-link>
      <f7-link href="/calendar-page/" :animate="false" text="Tab 3" icon-ios="f7:today_fill" icon-md="material:today"></f7-link>
      <f7-link href="/account/" :animate="false" text="Tab 4" icon-ios="f7:today_fill" icon-md="material:account_circle"></f7-link>
    </f7-toolbar>
    <div class="page-content">
      <div id="calendar" class="block block-strong no-padding no-margin no-hairline-top"></div>
      <div id="calendar-events" class="list no-margin no-hairlines no-ios-left-edge">
        <ul></ul>
      </div>
    </div>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7NavTitle } from 'framework7-vue'
import Avatar from 'vue-avatar'
import jwt_decode from 'jwt-decode'
export default {
  components: {
    Avatar,
    f7Navbar,
    f7Page,
    f7NavTitle
  },
  data() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    console.log(year)
    return {
      isBottom: true,
      today: new Date(year, month, day),
      events: [
        {
          date: new Date(2019, 0, 29, 12, 30),
          title: 'Meeting'
        },
        {
          date: new Date(year, month, day, 12, 30),
          title: 'Meeting with Vladimir'
        },
        {
          date: new Date(year, month, day, 18, 0),
          title: 'Shopping'
        },
        {
          date: new Date(year, month, day, 21, 0),
          title: 'Gym'
        },
        {
          date: new Date(year, month, day + 2, 16, 0),
          title: 'Pay loan'
        },
        {
          date: new Date(year, month, day + 2, 21, 0),
          title: 'Gym'
        }
      ]
    }
  },
  computed: {
    getCurrentUser() {
      return jwt_decode(sessionStorage.getItem('token'))
    }
  },
  methods: {
    renderEvents(calendar) {
      const self = this

      const currentDate = calendar.value[0]
      const currentEvents = self.events.filter(
        event =>
          event.date.getTime() >= currentDate.getTime() &&
          event.date.getTime() < currentDate.getTime() + 24 * 60 * 60 * 1000
      )
      let eventsHtml = ''
      if (currentEvents.length) {
        eventsHtml = currentEvents
          .map(event => {
            const hours = event.date.getHours()
            let minutes = event.date.getMinutes()
            if (minutes < 10) minutes = `0${minutes}`
            return (
              `${'<li class="item-content">' +
                '<div class="item-inner">' +
                '<div class="item-title">'}${event.title}</div>` +
              `<div class="item-after">${hours}:${minutes}</div>` +
              '</div>' +
              '</li>'
            )
          })
          .join('')
      } else {
        eventsHtml =
          '<li class="item-content">' +
          '<div class="item-inner">' +
          '<div class="item-title text-color-gray">No events for this day</div>' +
          '</div>' +
          '</li>'
      }
      self.$el.querySelector('.list ul').innerHTML = eventsHtml
    },
    onPageInit(e, page) {
      const self = this
      const app = self.$f7
      const $ = self.$$
      const monthNames = self.$i18n.t('monthNames')
      const monthNamesShort = self.$i18n.t('monthNamesShort')
      const dayNames = self.$i18n.t('dayNames')
      const dayNamesShort = self.$i18n.t('dayNamesShort')
      self.calendar = app.calendar.create({
        containerEl: '#calendar',
        toolbar: false,
        value: [self.today],
        dayNames: dayNames,
        dayNamesShort: dayNamesShort,
        events: self.events.map(
          event =>
            new Date(
              event.date.getFullYear(),
              event.date.getMonth(),
              event.date.getDate()
            )
        ),
        on: {
          init(calendar) {
            $('.navbar-calendar-title').text(
              `${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`
            )
            app.navbar.size(page.navbarEl)
            calendar.$el.addClass('no-ios-right-edge')
            self.renderEvents(calendar)
          },
          monthYearChangeStart(calendar) {
            $('.navbar-calendar-title').text(
              `${monthNames[calendar.currentMonth]}, ${calendar.currentYear}`
            )
            app.navbar.size(page.navbarEl)
          },
          change(calendar) {
            self.renderEvents(calendar)
          }
        }
      })
    },
    onPageBeforeRemove() {
      const self = this
      self.calendar.destroy()
    }
  }
}
</script>
