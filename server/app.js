const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./api/models/swagger.json')
const config = require('./config')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')
const itemRoutes = require('./api/routes/items')
const hotelRoutes = require('./api/routes/hotels')
const itineraryRoutes = require('./api/routes/itineraries')
const destinationRoutes = require('./api/routes/destinations')
//const petRoutes = require('./api/routes/pets')

console.log(config)

// var uri = "mongodb://i-bot_78:ll1RopOa15bkeVEH@cluster0-fu2am.mongodb.net/test?retryWrites=true";
const uri =
  'mongodb://i-bot_78:ll1RopOa15bkeVEH@cluster0-shard-00-00-fu2am.mongodb.net:27017,cluster0-shard-00-01-fu2am.mongodb.net:27017,cluster0-shard-00-02-fu2am.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const DBURI = 'mongodb://localhost:27017/loginapi'
const MONGOLAB_URI =
  'mongodb://i-bot-78:Dev23935520@ds145562.mlab.com:45562/glance'
// mongoose.connect(uri,{ useMongoClient: true });
mongoose.Promise = global.Promise
mongoose
  .connect(MONGOLAB_URI, {
    useNewUrlParser: true,
    connectTimeoutMS: 40000,
    socketTimeoutMS: 45000
  })
  .then(
    () => {
      console.log('DB connect')
    },
    err => {
      console.log(err)
    }
  )

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))

app.set('superSecret', config.SECRET)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// Routes which should handle requests
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)
app.use('/items', itemRoutes)
app.use('/hotels', hotelRoutes)
app.use('/itineraries', itineraryRoutes)
app.use('/destinations', destinationRoutes)
//app.use('/pets', petRoutes)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
