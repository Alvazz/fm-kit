const mongoose = require('mongoose')

const stepSchema = mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  geo: {
    name: { type: String, required: false },
    coords: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false }
    }
  }
})

module.exports = mongoose.model('Step', stepSchema)
