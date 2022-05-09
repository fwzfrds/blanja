const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

//  ----> /products.....
router
  .get('/', productsController.getProducts)
  .get('/:id', productsController.detailProduct)
  .post('/', productsController.insertProduct)
  .put('/:id', productsController.updateProduct)
  .delete('/:id', productsController.deleteProduct)

module.exports = router
