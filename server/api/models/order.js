const mongoose = require('mongoose')
const Product = require('./product')

// product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
// quantity: { type: Number, default: 1 }

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [Product.schema],
  name: { type: String, required: true },
  status: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Order', orderSchema)
