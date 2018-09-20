<template>
  <div>
    <ul class="timeline" v-for="(item, key) in sortAndGroupTimeline">
      <li v-if="item.length > 0" class="time-label">
        <span class="tag is-danger">
          {{ $d(new Date(key), 'short') }}
        </span>
      </li>
      <li class="" v-for="(article, index) in item">
        <span class="fa tag is-info" :class="[article.icon, article.type]"></span>
        <div class="timeline-item">
          <span class="time">
            <i class="fa fa-clock"></i> {{ article.createAt | moment("HH:mm") }}
          </span>
          <h3 class="timeline-header">
            <router-link :to="{name: 'profile', params: { id: article.author._id } }">{{article.author.username}}</router-link> {{article.subtitle}}
          </h3>
          <div class="timeline-body">
            <p>{{article.context.text}}</p>
            <p v-show="article.media.img">
              <carousel :perPageCustom="[[768, 3], [1024, 4]]" :minSwipeDistance="10">
                <slide v-for="(img, i) in article.media.img">
                  <img  :src="`http://localhost:3000/${img}`" alt="..." class="margin">
                </slide>
              </carousel>
            </p>
            <p v-show="article.media.video">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe v-for="(video, i) in article.media.video" class="embed-responsive-item" :src="video" frameborder="0" allowfullscreen=""></iframe>
              </div>
            </p>
          </div>
          <div class="timeline-footer">
            <router-link class="button is-small is-primary" :to="{name: 'item', params: { id: article._id } }">{{ $t('timeline.actions.readMore') }}</router-link>
            <a class="button is-small is-danger" @click="deleteItem(article._id)" v-show="$profile.isAllowed('destroy', article.author)">{{ $t('timeline.actions.delete') }}</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import API from '@/api'
import moment from 'moment'
import profilePerimeter from '@/perimeters/profilePerimeter'
export default {
  data() {
    return {
      timeline: []
    }
  },
  perimeters: [profilePerimeter],
  mounted() {
    API.get('items')
    .then(response => {
      const items = response.data.items
      this.$store.dispatch('setItems', items)
    })
    .catch(e => {
      console.log(e)
    })
  },
  computed: {
    sortAndGroupTimeline() {
      return this.$store.getters.getItems.sort((a, b) => {
        let textA = new Date(a.createAt).getTime()
        let textB = new Date(b.createAt).getTime()
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0
        //return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; //for ascending.
      }).reduce((rv, x) => {

        (rv[moment(x['createAt']).format('YYYY-MM-DD')] = rv[moment(x['createAt']).format('YYYY-MM-DD')] || []).push(x)
        return rv;
      }, {})
    }
  },
  methods: {
    getItem(id){
      API.get('items/'+id)
      .then(res => {
        console.log(res.data.item)

      })
      .catch(function (error) {
        console.log(error)
      })
    },
    deleteItem(id){
      API.delete('items/'+id)
      .then(res => {
        console.log('it works')
        this.$store.dispatch('deleteItem', id)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>


<style scoped>
.timeline {
  position: relative;
  margin: 0 0 30px 0;
  padding: 0;
  list-style: none;
}
.timeline > li > .fa,
.timeline > li > .glyphicon,
.timeline > li > .ion {
  width: 30px;
  height: 30px;
  font-size: 15px;
  line-height: 30px;
  position: absolute;
  /*
  color: #666;
  background: #d2d6de;
  */
  border-radius: 50%;
  text-align: center;
  left: 18px;
  top: 0;
}
.timeline > li {
  position: relative;
  margin-right: 10px;
  margin-bottom: 15px;
}
.timeline > li > .timeline-item {
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-top: 0;
  background: #fff;
  color: #444;
  margin-left: 60px;
  margin-right: 15px;
  padding: 0;
  position: relative;
}
.timeline > li:before,
.timeline > li:after {
  content: ' ';
  display: table;
  box-sizing: border-box;
}
.timeline > li:after {
  clear: both;
}
.timeline:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #ddd;
  left: 31px;
  margin: 0;
  border-radius: 2px;
}
.timeline > li > .timeline-item > .time {
  color: #999;
  float: right;
  padding: 10px;
  font-size: 12px;
}
.timeline > li > .timeline-item > .timeline-header {
  margin: 0;
  color: #555;
  border-bottom: 1px solid #f4f4f4;
  padding: 10px;
  font-size: 16px;
  line-height: 1.1;
}
.timeline .time i {
  font-size: 15px !important;
}
.timeline > li > .timeline-item > .timeline-body,
.timeline > li > .timeline-item > .timeline-footer {
  padding: 10px;
}
.timeline > li > .timeline-item > .timeline-body p {
  margin: 0 0 10px 0;
}
.timeline > li > .timeline-item > .timeline-body img {
  width: 100%;
  padding: 10px;
}
.timeline > li > .timeline-item > .timeline-body img.margin {
  margin-right: 5px;
}

.timeline > li > .timeline-item > .timeline-footer .button {
  margin-right: 5px;
}

.timeline > li > .timeline-item > .timeline-body iframe {
}

@media (max-width: 320px) {
  .timeline > li > .timeline-item > .timeline-body iframe {
    width: 100%;
  }
}
</style>
