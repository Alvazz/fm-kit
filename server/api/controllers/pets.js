const mongoose = require('mongoose')
const Pet = require('../models/pet')

exports.pets_get_all = (req, res, next) => {
  console.log('pet')
  Pet.find()
    .lean()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        items: docs.map(doc => {
          return {
            doc: doc
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

exports.pets_create_item = (req, res, next) => {
  const pet = new Pet({
    id: 123,
    name: 'Fluffy',
    photoUrls: 'photo'
  })
  console.log(pet)
  pet
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Created Pet successfully'
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}
