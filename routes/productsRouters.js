const express = require('express')
const router = express.Router()
const {
  getProducts,
  detailProduct,
  insertProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productsController')
const { protect, isAdmin } = require('../middlewares/authMiddleware')
const uploadPhoto = require('../middlewares/uploadPhoto')

//  ----> /products.....
router
  .get('/', getProducts)
  .get('/detail/:id', detailProduct)
  .post('/add', protect, isAdmin, uploadPhoto.array('photo', 3), insertProduct)
  .put('/edit/:id', protect, isAdmin, uploadPhoto.array('photo', 3), updateProduct)
  .delete('/:id', protect, isAdmin, deleteProduct)

module.exports = router
