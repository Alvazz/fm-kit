var fs = require('fs');
const mongoose = require('mongoose')
const Destination = require('../models/destination')

exports.destinations_get_all = (req, res, next) => {
  var pageOptions = {
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 10
  }
  Destination.find()
  //.select('title subtitle context author creator startAt geo source createAt _id cover media status')
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .lean()
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      set: docs.map(doc => {
        return {
          _id: doc._id,
          slug: doc.slug,
          title: doc.title,
          subtitle: doc.subtitle,
          when: doc.when,
          infos: doc.infos,
          description: doc.description,
          cover: doc.cover,
          createAt: doc.createAt,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/destinations/'
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

exports.destinations_get = (req, res, next) => {
  const id = req.params.itemId
  Destination.findById(id)
  //.select('title creator startAt geo source createAt _id cover')
  .lean()
  .exec()
  .then(doc => {
    if (doc) {
      res.status(200).json({
        set:{
          _id: doc._id
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/destinations/' + doc._id
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

exports.destinations_create = (req, res, next) => {
  const destination = new Destination({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    subtitle: req.body.subtitle,
    slug: req.body.slug,
    when: req.body.when,
    infos: req.body.infos,
    description: req.body.description,
    order: req.body.order,
    cover: 'http://localhost:3001/uploads/destinazione.png', //req.file.path
  })

  destination
  .save()
  .then(result => {
    res.status(201).json({
      message: 'Created destination successfully',
      set: {
        _id: result._id,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/destinations/' + result._id
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

exports.destinations_update = (req, res, next) => {

}

exports.destinations_delete = (req, res, next) => {
  const id = req.params.itemId
  Destination.findByIdAndRemove(id, function(err, destination) {
    fs.unlink(hotel.cover, (err) => {
      if (err) throw err
      console.log('Img was deleted')
    });
  })
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Hotel deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/destinations'
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
