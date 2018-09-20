const swaggerMongoose = require('swagger-mongoose')
const fs = require('fs')
const swaggerJson = fs.readFileSync('./swagger.json')
const Pet = swaggerMongoose.compile(swaggerJson).models.Pet

module.exports = Pet
