const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  results: [{ text: String }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productImage: { type: String, required: false }
})

module.exports = mongoose.model('Product', productSchema)
