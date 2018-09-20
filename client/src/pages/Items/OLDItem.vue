<template>
  <div class="section">
    <h1 class="title">Order {{order.name}}</h1>
    <h2>Add product</h2>
    <hr/>
    <div class="box">
      <div class="columns is-2">
        <div class="column has-text-centered">
          <a class="box" @click="openModalProduct('hotel')">
            Hotel
          </a>
        </div>
        <div class="column has-text-centered">
          <a class="box" @click="openModalProduct('flight')">
            Flight
          </a>
        </div>
        <div class="column has-text-centered">
          <a class="box" @click="openModalProduct('auto')">
            Auto
          </a>
        </div>
        <div class="column has-text-centered">
          <a class="box">
            ...
          </a>
        </div>
      </div>
    </div>
    <h2>Product list</h2>
    <div class="button is-primary is-small" @click="searchAll">
      <span class="icon">
        <i class="fas fa-search"></i>
      </span>
      <span>All</span>
    </div>
    <div class="modal" :class="{'is-active': showModal}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <!-- Any other Bulma elements you want -->
        <a class="box">
          <h2 class="title">Add new {{product.type}}</h2>
          <div class="form-hotel" v-show="product.type === 'hotel'">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <div class="control">
                    <gmap-autocomplete
                    @place_changed="setPlace" class="input">
                  </gmap-autocomplete>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <flat-pickr class="input" v-model="form.hotel.from" placeholder="Check in" :config="form.hotel.configs.start" @on-change="onStartChange" readonly>
              </flat-pickr>
            </div>
            <div class="column is-6">
              <flat-pickr class="input" v-model="form.hotel.to" placeholder="Check out" :config="form.hotel.configs.end"  @on-change="onEndChange" readonly>
              </flat-pickr>
            </div>
          </div>
          <ConfRooms :rooms="form.hotel.rooms"/>
        </div>
        <hr />
        <div class="button is-primary" @click="addProductInOrder">
          Add
        </div>
      </a>
    </div>
    <button class="modal-close is-large" @click="showModal = false" aria-label="close"></button>
  </div>
  <hr/>
  <p v-if="order.products.length === 0">No products</p>
  <table class="table is-fullwidth" v-else>
    <thead>
      <tr>
        <th><abbr title="Position">#</abbr></th>
        <th>Type</th>
        <th>City</th>
        <th>Chek-in</th>
        <th>Chek-out</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th>
        </th>
      </tr>
    </tfoot>
    <tbody>
      <tr v-for="(product, index) in order.products">
        <th>{{index+1}}</th>
        <td>
          <router-link :to="{name: 'singleProduct', params: { productId: product._id, type: product.type } }">
            {{product.type}}
          </router-link>
        </td>
        <td>
          <router-link :to="{name: 'singleProduct', params: { productId: product._id, type: product.type } }">
            {{product.query.place.name}}
          </router-link>
        </td>
        <td>{{product.query.from}}</td>
        <td>{{product.query.to}}</td>
        <td class="actions">
          <router-link  class="icon has-text-info" :to="{name: 'singleProduct', params: { productId: product._id, type: product.type } }">
            <i class="fas fa-info-circle"></i>
          </router-link>
          <span class="icon has-text-danger" @click="deleteProductInOrder(product._id)">
            <i class="fas fa-trash-alt"></i>
          </span>
          <span class="icon" v-if="!product.load"@click="hotelSearch(product._id)">
            <i class="fas fa-search"></i>
          </span>
          <span class="icon" v-else>
            <i class="fas fa-spinner fa-spin"></i>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import API from '@/api'
import jwt_decode from 'jwt-decode'
import ConfRooms from '@/components/ConfRooms'

export default {
  name: 'Order',
  components: {
    ConfRooms
  },
  data() {
    return {
      showModal: false,
      order: {
        products: []
      },
      form: {
        hotel: {
          place: {},
          from: '',
          to: '',
          rooms: [{ rph: 1, adults: 2, children: [] }],
          configs: {
            start: {
              wrap: true,
              dateFormat: 'd-m-Y',
              minDate: new Date(),
              maxDate: null
            },
            end: {
              wrap: true,
              dateFormat: 'd-m-Y',
              minDate: null
            }
          }
        }
      },
      product: {
        type: 'hotel',
        result: [],
        query: {},
        userId: ''
      }
    }
  },
  created() {
    API.get('orders/' + this.$route.params.id)
      .then(response => {
        this.order = response.data.set
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    setPlace(place) {
      this.form.hotel.place = place
      console.log(this.form)
    },
    openModalProduct(type) {
      this.showModal = true
      this.product.type = type
      this.product.userId = jwt_decode(this.$store.getters.getToken).userId
    },
    onStartChange(selectedDates, dateStr, instance) {
      this.$set(this.form.hotel.configs.end, 'minDate', dateStr)
    },
    onEndChange(selectedDates, dateStr, instance) {
      console.log(dateStr)
      //this.$set(this.form.hotel.configs.start, 'maxDate', dateStr)
    },
    addProductInOrder() {
      const self = this
      self.product.query = self.form.hotel
      if (
        Object.keys(this.form.hotel.place).length > 0 &&
        this.form.hotel.from.length > 0 &&
        this.form.hotel.to.length > 0
      ) {
        API.post('orders/update/' + self.$route.params.id, self.product)
          .then(response => {
            self.showModal = false
            self.order = response.data.set
            //self.discovery(response.data.set._id)
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    addResultsInProduct(id, results) {
      console.log(results)
      API.post('orders/update/products/' + id, results)
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    },
    isLoading(id) {
      const product = this.getProduct(id)[0]
      if (product.load === undefined) {
        product.load = false
      }

      product.load = !product.load

      console.log('IS LOADING', product.load)
      return product.load
    },
    getProduct(id) {
      const product = this.order.products.filter(el => {
        return el._id === id
      })
      return product
    },
    discovery(id) {
      this.isLoading(id)
      const product = this.getProduct(id)[0]
      const searchBody = {
        items: [
          {
            room: {
              geo: [
                {
                  pointRadiusFilter: {
                    loc: [
                      {
                        lat: product.query.place.geometry.location.lat,
                        lng: product.query.place.geometry.location.lng,
                        radius: 0.2,
                        maxDistance: 1000000,
                        limit: 5
                      }
                    ]
                  }
                }
              ],
              period: { start: 1555545630000, duration_mins: 11520 },
              participants: [
                { birthDate: 608860800000 },
                { birthDate: 608860800000 }
              ]
            }
          }
        ],
        scope: 'alidays',
        place: product.query.place,
        quotationId: '645045',
        agencyId: 39658,
        operatoreId: '3810'
      }
      API.post(
        'http://v3services.h2h.alidays.it:18090/h2h/aggregator/alidays/discovery/search',
        searchBody
      ).then(res => {
        const aggregatorId = res.data.h2hAggregatorId
        this.bestPrice(id, aggregatorId)
      })
    },
    bestPrice(id, aggregatorId) {
      const bestPriceBody = {
        h2hSearchResultAggr: {
          filter: {
            rooms: 1
          },
          limit: 10000,
          skip: 0
        }
      }
      API.post(
        'http://v3services.h2h.alidays.it:18090/h2h/aggregator/alidays/discovery/enquiry/' +
          aggregatorId +
          '/best-prices',
        bestPriceBody
      ).then(res => {
        console.log(res)
        this.addResultsInProduct(id,res.data.set)
        this.isLoading(id)
      })
    },
    hotelSearch(id) {
      this.discovery(id)
    },
    searchAll() {
      for (var key in this.order.products) {
        var product = this.order.products[key]
        this.hotelSearch(product._id)
      }
    },
    deleteProductInOrder(id) {
      const self = this
      const body = {
        id: id
      }
      API.post('orders/delete/' + self.$route.params.id, body)
        .then(response => {
          self.order = response.data.set
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="scss">
.actions i {
  cursor: pointer;
}
</style>
