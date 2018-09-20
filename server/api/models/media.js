const mongoose = require('mongoose')

const mediaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  url: { type: String, required: false },
  createAt: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  meta: { type: Array }
})

module.exports = mongoose.model('Media', mediaSchema)
