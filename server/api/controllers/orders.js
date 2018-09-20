const mongoose = require('mongoose')

const Order = require('../models/order')
const Product = require('../models/product')

exports.orders_get_all = (req, res, next) => {
  var pageOptions = {
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 10
  }
  Order.find()
  .select('product creator name _id')
  .skip(pageOptions.page*pageOptions.limit)
  .limit(pageOptions.limit)
  .populate('creator')
  .lean()
  .exec()
  .then(docs => {
    console.log(docs)

    if (docs.length === 0){
      console.log("There are no results matching your query.");
    }else{
      Order.count({})
      .then(count => {
        console.log(JSON.stringify({count, docs}));
        res.status(200).json({
          total: count,
          count: docs.length,
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              product: doc.product,
              creator: doc.creator,
              name: doc.name,
              // quantity: doc.quantity,
              request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' + doc._id
              }
            }
          })
        })
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
}
/*
exports.orders_create_order = (req, res, next) => {
Product.findById(req.body.productId)
.then(product => {
if (!product) {
return res.status(404).json({
message: 'Product not found'
})
}
const order = new Order({
_id: mongoose.Types.ObjectId(),
// product: req.body.productId,
quantity: req.body.quantity
})
return order.save()
})
.then(result => {
console.log(result)
res.status(201).json({
message: 'Order stored',
createdOrder: {
_id: result._id,
product: result.product,
quantity: result.quantity
},
request: {
type: 'GET',
url: 'http://localhost:3000/orders/' + result._id
}
})
})
.catch(err => {
console.log(err)
res.status(500).json({
error: err
})
})
}
*/

exports.orders_create_order = (req, res, next) => {
  console.log(req.body)
  var userId = new mongoose.mongo.ObjectId(req.body.userId)
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    creator: userId,
    status: req.body.status
  })

  order
  .save()
  .then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Order stored',
      createdOrder: {
        _id: result._id,
        name: result.name,
        creator: result.creator
        // quantity: result.quantity
      },
      request: {
        type: 'GET',
        url: 'http://localhost:3000/orders/' + result._id
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
}

exports.orders_get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
  .populate('creator', 'username')
  .populate('product')
  .exec()
  .then(order => {
    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      })
    }
    res.status(200).json({
      set: order,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/orders'
      }
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
}

exports.orders_get_product_order = (req, res, next) => {
  console.log(req.params.productId)
  Order.find({
    products: {
      $elemMatch: { _id: req.params.productId }
    }
  })
  .lean()
  .exec()
  .then(result => {
    res.status(201).json({
      message: 'Product',
      set: result,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/orders/product/' + result._id
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
}

exports.orders_update_product_order = (req, res, next) => {
  // var obj = { type:req.body.type ,results:req.body.results, creator:req.body.userId }
  console.log(req.params.orderId)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    type: req.body.type,
    results: req.body.results,
    load: false,
    query: req.body.query,
    creator: req.body.userId
  })

  Order.findOneAndUpdate(
    { _id: req.params.orderId },
    { $push: { products: product } },
    { new: true }
  )
  .lean()
  .exec()
  .then(result => {
    res.status(201).json({
      message: 'Order updated',
      set: result,
      request: {
        type: 'POST',
        url: 'http://localhost:3000/orders/update/' + result._id
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
}

exports.orders_update_results_in_products_order = (req, res, next) => {
  const results =  req.body
  console.log(req.body)
  Order.findOneAndUpdate(
    { "products._id": req.params.productId},
    { "products.$.results": results },
    { new: true }
  )
  .lean()
  .exec()
  .then(result => {
    res.status(201).json({
      message: 'Results added in product',
      set: result,
      request: {
        type: 'POST',
        url: 'http://localhost:3000/orders/update/products/' + result._id
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
}

exports.orders_delete_product_order = (req, res, next) => {
  console.log(req.params, req.body)
  Order.findOneAndUpdate(
    { _id: req.params.orderId },
    { $pull: { products: { _id: req.body.id } } },
    { new: true }
  )
  .lean()
  .exec()
  .then(result => {
    res.status(201).json({
      message: 'Order updated',
      set: result,
      request: {
        type: 'POST',
        url: 'http://localhost:3000/orders/update/' + result._id
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
}

exports.orders_delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Order deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/orders',
        body: { productId: 'ID', quantity: 'Number' }
      }
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
}
