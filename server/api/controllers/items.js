var fs = require('fs');
const mongoose = require('mongoose')
const Item = require('../models/item')

exports.items_get_all = (req, res, next) => {
  var pageOptions = {
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 10
  }
  Item.find()
  .select('title subtitle context author creator startAt geo source createAt _id cover media status')
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .populate('author')
  .lean()
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      items: docs.map(doc => {
        return {
          title: doc.title,
          subtitle: doc.subtitle,
          context: doc.context,
          author: {
            _id: doc.author._id,
            username: doc.author.username,
            pic: ''
          },
          media: doc.media,
          cover: doc.cover,
          source: doc.source,
          startAt: doc.startAt,
          createAt:doc.createAt,
          geo: doc.geo,
          _id: doc._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/items/' + doc._id
          }
        }
      })
    }
    if (docs.length >= 0) {
      res.status(200).json(response)
    } else {
      res.status(404).json({
        message: 'No entries found'
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
}

exports.items_create_item = (req, res, next) => {
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    context:{
      text: req.body.title
    },
    subtitle: req.body.subtitle,
    geo: {
      name: req.body.geoName,
      coords: {
        lat: req.body.geoLat,
        lng: req.body.geoLng
      }
    },
    media:{
      img: [
        'https://images.unsplash.com/photo-1531752148124-118ba196fc7b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5873a2740d0253736d14ceb7ec4a3974&auto=format&fit=crop&w=2850&q=80',
        'https://images.unsplash.com/photo-1531730958017-69b1c3b183ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=216dc3fa80e7d06b1f97c70e9e1107c4&auto=format&fit=crop&w=2850&q=80',
        'https://images.unsplash.com/photo-1531705829171-5c50027ccb82?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a2ae5d26aa02d36770d13399f6d52937&auto=format&fit=crop&w=1500&q=80',
        'https://images.unsplash.com/photo-1531701700846-f419efed7d66?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cc61b770b187533d8b575488ce1c6312&auto=format&fit=crop&w=1500&q=80'
      ],
      video: ['https://www.youtube.com/embed/tMWkeBIohBs'],
      audio: []
    },
    status: req.body.status,
    creator: new mongoose.mongo.ObjectId(req.body.userId),
    author: new mongoose.mongo.ObjectId(req.body.userId),
    startAt: new Date(req.body.startAt),
    source: req.body.source,
    cover: req.file.path
  })
  item
  .save()
  .then(result => {
    res.status(201).json({
      message: 'Created item successfully',
      item: {
        title: result.title,
        creator: result.creator,
        cover: result.cover,
        geo: result.geo,
        _id: result._id,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/items/' + result._id
        }
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

exports.items_create_multi_item = (req, res, next) => {
  console.log(req.files)
  const img = []
  for (let key in req.files) {
    let item = req.files[key]
    img.push(item.path)
  }
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    context:{
      text: req.body.title
    },
    subtitle: req.body.subtitle,
    geo: {
      name: req.body.geoName,
      coords: {
        lat: req.body.geoLat,
        lng: req.body.geoLng
      }
    },
    media:{
      img: img,
      video: ['https://www.youtube.com/embed/'+req.body.source],
      audio: []
    },
    status: req.body.status,
    creator: new mongoose.mongo.ObjectId(req.body.userId),
    author: new mongoose.mongo.ObjectId(req.body.userId),
    startAt: new Date(req.body.startAt),
    source: req.body.source,
    cover: req.files[0].path
  })
  item
  .save()
  .then(result => {
    res.status(201).json({
      message: 'Created item successfully',
      item: {
        title: result.title,
        creator: result.creator,
        cover: result.cover,
        geo: result.geo,
        _id: result._id,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/items/' + result._id
        }
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

exports.items_get_item = (req, res, next) => {
  const id = req.params.itemId
  Item.findById(id)
  .select('title creator startAt geo source createAt _id cover')
  .populate('creator')
  .lean()
  .exec()
  .then(doc => {
    if (doc) {
      res.status(200).json({
        item:{
          title: doc.title,
          user: {
            _id: doc.creator._id,
            username: doc.creator.username,
            pic: ''
          },
          cover: doc.cover,
          source: doc.source,
          startAt: doc.startAt,
          createAt:doc.createAt,
          geo: doc.geo,
          _id: doc._id
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/items'
        }
      })
    } else {
      res
      .status(404)
      .json({ message: 'No valid entry found for provided ID' })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: err })
  })
}

exports.items_update_item = (req, res, next) => {
  const id = req.params.itemId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Item.update({ _id: id }, { $set: updateOps })
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Item updated',
      request: {
        type: 'GET',
        url: 'http://localhost:3000/items/' + id
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

exports.items_delete = (req, res, next) => {
  const id = req.params.itemId
  Item.findByIdAndRemove(id, function(err, item) {
    for (var i = 0; i < item.media.img.length; i++) {
      fs.unlink(item.media.img[i], (err) => {
        if (err) throw err
        console.log('Img was deleted')
      });
    }
  })
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Item deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/items',
        body: { name: 'String', price: 'Number' }
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
