var fs = require('fs');
const mongoose = require('mongoose')
const Media = require('../models/media')

exports.media_get_all = (req, res, next) => {
  var pageOptions = {
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 10
  }
  Media.find()
  //.select('title subtitle context author creator startAt geo source createAt _id cover media status')
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .populate('author')
  .lean()
  .exec()
  .then(docs => {
    const destinations = []
    const response = {
      count: docs.length,
      set: docs.map(doc => {
        return {
          _id: doc._id,
          title: doc.title,
          type: doc.type,
          meta: doc.media,
          description: doc.description,
          createAt: doc.createAt,
          url: doc.cover,
          author: {
            _id: doc.author._id,
            username: doc.author.username,
            pic: ''
          },
          request: {
            type: 'GET',
            url: 'http://localhost:3001/media/'
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

exports.media_get = (req, res, next) => {
  const id = req.params.itemId
  Hotel.findById(id)
  //.select('title creator startAt geo source createAt _id cover')
  .populate('author')
  .lean()
  .exec()
  .then(doc => {
    if (doc) {
      res.status(200).json({
        set:{
          _id: doc._id,
          title: doc.title,
          type: doc.type,
          meta: doc.media,
          description: doc.description,
          createAt: doc.createAt,
          url: doc.cover,
          author: {
            _id: doc.author._id,
            username: doc.author.username,
            pic: ''
          }
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3001/media/' + doc._id
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

exports.media_create = (req, res, next) => {
  const hotel = new Hotel({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
    meta: req.body.meta,
    author: new mongoose.mongo.ObjectId(req.body.userId),
    url: req.file.path
  })
  hotel
  .save()
  .then(result => {
    res.status(201).json({
      message: 'Created media successfully',
      set: {
        _id: result._id,
        request: {
          type: 'GET',
          url: 'http://localhost:3001/media/' + result._id
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

exports.media_delete = (req, res, next) => {
  const id = req.params.itemId
  Hotel.findByIdAndRemove(id, function(err, media) {
    fs.unlink(media.url, (err) => {
      if (err) throw err
      console.log('Img was deleted')
    });
  })
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Media deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3001/media'
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
