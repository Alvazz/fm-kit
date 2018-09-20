const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: { type: String, required: false },
  status: { type: String, required: false },
  load: { type: Boolean, required: false },
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  follower: { type: Array },
  media:{
    video: { type: Array },
    audio: { type: Array },
    img: { type: Array },
  },
  context: {
    text: {type: String, required: false }
  },
  geo: {
    name: { type: String, required: false },
    coords: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false }
    }
  },
  cover: { type: String, required: false },
  source: { type: String, required: false },
  comments: [{ body: String, date: Date }],
  createAt: { type: Date, default: Date.now },
  startAt: { type: Date },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
})

module.exports = mongoose.model('Item', itemSchema)
