const express = require('express')
const router = express.Router()
const {
  getTransc,
  insertTransc,
  updateTransStatus
} = require('../controllers/transcController')

//  ----> /transactions.....
router
  .get('/:id', getTransc)
  .post('/', insertTransc)
  .put('/:id', updateTransStatus)
// .delete("/:id", cartsController.deleteCart);

module.exports = router
