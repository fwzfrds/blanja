const express = require('express')
const router = express.Router()
const {
  getProducts,
  detailProduct,
  insertProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productsController')

//  ----> /products.....
router
  .get('/', getProducts)
  .get('/:id', detailProduct)
  .post('/', insertProduct)
  .put('/:id', updateProduct)
  .delete('/:id', deleteProduct)

module.exports = router
