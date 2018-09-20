const mongoose = require('mongoose')

const itinerarySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: { type: String, required: false },
  slug: { type: String, required: false },
  status: { type: String, required: false },
  steps: { type: Array },
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  description: { type: String, required: false },
  destinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination' }],
  cover: { type: String, required: false },
  createAt: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Itinerary', itinerarySchema)
