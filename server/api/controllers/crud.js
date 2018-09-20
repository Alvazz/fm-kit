const Mongoose = require('Mongoose')
const SMCrud = require('swagger-mongoose-crud')
const Pet = require('../models/pet')
const modelName = 'Pet'
const options = {}

const crud = new SMCrud(Pet.schema, modelName, options)
const crudExports = {}

// Takes all parameters for creating an entry
crudExports.create = crud.create

// Takes parameter 'id' for searching in the DB, will update rest of the parameters.
crudExports.update = crud.update

// Will list out the entire collection, No parameters
crudExports.index = crud.index

// Will mark the entity as deleted by setting deleted flag to true, takes 'id'
crudExports.markAsDeleted = crud.markAsDeleted

// Will delete the entity, takes 'id'
crudExports.destroy = crud.destroy

// Will show a single entity, takes 'id'
crudExports.show = crud.show

// Will count the number of entries in the DB, Supports filter options.
crudExports.count = crud.count

// Will update multiple document, takes comma separated 'id'
crudExports.bulkUpdate = crud.bulkUpdate

// Will create multiple documents, takes file with comma separated data
crudExports.bulkUpload = crud.bulkUpload

// Will show multiple entity, takes comma separated 'id'
crudExports.bulkShow = crud.bulkShow

// Will ensure consistency when there are multiple parallel updates expected on the same document. This module is partially incomplete.
crudExports.rucc = crud.rucc

// crud.model will hold the Mongoose Model.
// crud.schema will hold the schema passed on at constructor
crud.select = [
  // list of the fields for the listing in Index call
]

crud.omit = [
  // list of the fields to disallow for Index search
]

module.exports = crudExports
