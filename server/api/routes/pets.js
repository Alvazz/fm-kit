const express = require('express')
const router = express.Router()
const PetsController = require('../controllers/pets')
const CrudController = require('../controllers/crud')

console.log(CrudController.create)

router.get('/', PetsController.pets_get_all)

router.post('/', CrudController.create) // PetsController.pets_create_item)

module.exports = router
