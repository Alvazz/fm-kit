var fs = require('fs');
const mongoose = require('mongoose')
const Itinerary = require('../models/itinerary')

exports.itineraries_get_all = (req, res, next) => {
  var pageOptions = {
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 10
  }
  Itinerary.find()
  //.select('title subtitle context author creator startAt geo source createAt _id cover media status')
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .populate('author')
  .populate('destinations')
  .lean()
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      set: docs.map(doc => {
        return {
          _id: doc._id,
          type: doc.type,
          slug: doc.slug,
          status: doc.status,
          steps: doc.steps,
          title: doc.title,
          subtitle: doc.subtitle,
          description: doc.description,
          destinations: doc.destinations,
          cover: doc.cover,
          createAt: doc.createAt,
          author: {
            _id: doc.author._id,
            username: doc.author.username,
            pic: ''
          },
          request: {
            type: 'GET',
            url: 'http://localhost:3000/itineraries/'
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

exports.itineraries_get = (req, res, next) => {
  const id = req.params.itemId
  Itinerary.findById(id)
  //.select('title creator startAt geo source createAt _id cover')
  .populate('author')
  .populate('destinations')
  .lean()
  .exec()
  .then(doc => {
    if (doc) {
      res.status(200).json({
        set:{
          _id: doc._id,
          type: doc.type,
          slug: doc.slug,
          status: doc.status,
          steps: doc.steps,
          title: doc.title,
          subtitle: doc.subtitle,
          description: doc.description,
          destinations: doc.destinations,
          cover: doc.cover,
          createAt: doc.createAt,
          author: {
            _id: doc.author._id,
            username: doc.author.username,
            pic: ''
          }
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/itineraries/' + doc._id
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

exports.itineraries_create = (req, res, next) => {

  /*
  const destionations = []
  for(var key in req.body.destinations){
    destinations.push(new mongoose.mongo.ObjectId(req.body.destinations[key].destionationId))
  }
  */

  const itinerary = new Itinerary({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    subtitle: req.body.subtitle,
    slug: req.body.slug,
    type: req.body.type,
    description: req.body.title,
    destinations: [new mongoose.mongo.ObjectId(req.body.destinations)],
    steps: req.body.steps,
    status: req.body.status,
    author: new mongoose.mongo.ObjectId(req.body.userId),
    cover: 'https://images.unsplash.com/photo-1531752148124-118ba196fc7b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5873a2740d0253736d14ceb7ec4a3974&auto=format&fit=crop&w=2850&q=80', //req.file.path
  })

  itinerary
  .save()
  .then(result => {
    res.status(201).json({
      message: 'Created itinerary successfully',
      set: {
        _id: result._id,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/itineraries/' + result._id
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

exports.itineraries_update = (req, res, next) => {

}

exports.itineraries_delete = (req, res, next) => {
  const id = req.params.itemId
  Itinerary.findByIdAndRemove(id, function(err, destination) {
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
        url: 'http://localhost:3000/itineraries'
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
