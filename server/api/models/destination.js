const mongoose = require('mongoose')

const destinationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  slug: { type: String, required: false },
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  when: { type: String, required: false },
  order: { type: Number, default: 0 },
  infos: { type: String, required: false },
  description: { type: String, required: false },
  cover: { type: String, required: false },
  createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Destination', destinationSchema)
