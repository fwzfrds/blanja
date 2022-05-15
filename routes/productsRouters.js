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

//  ----> /products.....
router
  .get('/', getProducts)
  .get('/detail/:id', detailProduct)
  .post('/add', protect, isAdmin, insertProduct)
  .put('/edit/:id', protect, isAdmin, updateProduct)
  .delete('/:id', protect, isAdmin, deleteProduct)

module.exports = router
