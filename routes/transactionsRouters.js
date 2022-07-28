const express = require('express')
const router = express.Router()
const {
  getTransc,
  insertTransc,
  updateTransStatus
} = require('../controllers/transcController')
const { protect, isUser } = require('../middlewares/authMiddleware')

//  ----> /transactions.....
router
  // .get('/:id', getTransc)
  .get('/', protect, isUser, getTransc)
  .post('/', protect, isUser, insertTransc)
  .put('/:id', updateTransStatus)
// .delete("/:id", cartsController.deleteCart);

module.exports = router
