const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const DestinationsController = require('../controllers/destinations')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})


router.get('/', DestinationsController.destinations_get_all)

router.post(
  '/',
  //checkAuth,
  upload.array('cover'),
  DestinationsController.destinations_create
)

router.get('/:itemId', DestinationsController.destinations_get)

router.patch('/:itemId', checkAuth, DestinationsController.destinations_update)

router.delete('/:itemId', checkAuth, DestinationsController.destinations_delete)

module.exports = router
