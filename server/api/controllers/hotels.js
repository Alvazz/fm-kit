var fs = require('fs');
const mongoose = require('mongoose')
const Hotel = require('../models/hotel')

exports.hotels_get_all = (req, res, next) => {
  var pageOptions = {
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 10
  }
  Hotel.find()
  //.select('title subtitle context author creator startAt geo source createAt _id cover media status')
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .populate('author')
  .populate('destinations')
  .populate('itineraries')
  .lean()
  .exec()
  .then(docs => {
    const destinations = []
    console.log(docs)
    const response = {
      count: docs.length,
      set: docs.map(doc => {
        return {
          _id: doc._id,
          slug: doc.slug,
          title: doc.title,
          subtitle: doc.subtitle,
          geo: doc.geo,
          media: doc.media,
          itineraries: doc.itineraries,
          destinations: doc.destinations,
          createAt: doc.createAt,
          cover: doc.cover,
          author: {
            _id: doc.author._id,
            username: doc.author.username,
            pic: ''
          },
          request: {
            type: 'GET',
            url: 'http://localhost:3000/hotels/'
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

exports.hotels_get = (req, res, next) => {
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
          _id: doc._id
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/hotels/' + doc._id
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

exports.hotels_create = (req, res, next) => {
  //new mongoose.mongo.ObjectId(req.body.userId),
  console.log(req.body)
  /*
  const itineraries = []
  for(var key in req.body.destinations){
    itineraries.push(new mongoose.mongo.ObjectId(req.body.itineraries[key].itineraryId))
  }

  const destionations = []
  for(var key in req.body.destinations){
    destinations.push(new mongoose.mongo.ObjectId(req.body.destinations[key].destionationId))
  }
  */
  const hotel = new Hotel({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    subtitle: req.body.subtitle,
    slug: req.body.slug,
    type: req.body.type,
    description: req.body.title,
    itineraries: [new mongoose.mongo.ObjectId(req.body.itineraries)],
    destinations: [new mongoose.mongo.ObjectId(req.body.destinations)],
    geo: {
      name: req.body.geoName,
      coords: {
        lat: req.body.geoLat,
        lng: req.body.geoLng
      }
    },
    media:{
      img: [
        'http://localhost:3001/uploads/hotel/NY_1.jpg',
        'http://localhost:3001/uploads/hotel/NY_2.jpg',
        'http://localhost:3001/uploads/hotel/NY_3.jpg'
      ],
      video: [],
      audio: []
    },
    status: req.body.status,
    author: new mongoose.mongo.ObjectId(req.body.userId),
    cover: 'http://localhost:3001/uploads/hotel/NY_1.jpg', //req.file.path
  })
  hotel
  .save()
  .then(result => {
    res.status(201).json({
      message: 'Created hotel successfully',
      set: {
        _id: result._id,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/hotels/' + result._id
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

exports.hotels_update = (req, res, next) => {

}

exports.hotels_delete = (req, res, next) => {
  const id = req.params.itemId
  Hotel.findByIdAndRemove(id, function(err, hotel) {
    for (var i = 0; i < hotel.media.img.length; i++) {
      fs.unlink(hotel.media.img[i], (err) => {
        if (err) throw err
        console.log('Img was deleted')
      });
    }
  })
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Hotel deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/hotels'
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
