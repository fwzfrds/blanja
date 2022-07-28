const express = require('express')
const router = express.Router()
const {
  getCarts,
  insertCart,
  updateCartQty,
  deleteCart
} = require('../controllers/cartsController')
const { protect, isUser } = require('../middlewares/authMiddleware')

//  ----> /cart.....
router
  .get('/', protect, isUser, getCarts)
  // .get('/', protect, isUser, getCarts)
  .post('/', protect, isUser, insertCart)
  .put('/:id', protect, isUser, updateCartQty)
  .delete('/:id', protect, isUser, deleteCart)

module.exports = router
