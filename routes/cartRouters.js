const express = require('express')
const router = express.Router()
const {
  getCarts,
  insertCart,
  updateCartQty,
  deleteCart
} = require('../controllers/cartsController')

//  ----> /cart.....
router
  .get('/:id', getCarts)
  .post('/', insertCart)
  .put('/:id', updateCartQty)
  .delete('/:id', deleteCart)

module.exports = router
