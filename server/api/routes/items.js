const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const ItemsController = require('../controllers/items')

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

router.get('/', ItemsController.items_get_all)

router.post(
  '/',
  checkAuth,
  upload.single('cover'),
  ItemsController.items_create_item
)

router.post(
  '/multi',
  checkAuth,
  upload.array('cover'),
  ItemsController.items_create_multi_item
)

router.get('/:itemId', ItemsController.items_get_item)

router.patch('/:itemId', checkAuth, ItemsController.items_update_item)

router.delete('/:itemId', checkAuth, ItemsController.items_delete)

module.exports = router
