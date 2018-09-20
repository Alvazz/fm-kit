const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: { type: String, required: false },
  slug: { type: String, required: false },
  status: { type: String, required: false },
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  description: { type: String, required: false },
  itineraries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary'
  }],
  destinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  }],
  media:{
    video: { type: Array },
    audio: { type: Array },
    img: { type: Array },
  },
  geo: {
    name: { type: String, required: false },
    coords: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false }
    }
  },
  cover: { type: String, required: false },
  createAt: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Hotel', hotelSchema)
