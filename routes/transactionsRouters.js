const express = require('express')
const router = express.Router()
const transcController = require('../controllers/transcController')

//  ----> /transactions.....
router
  .get('/:id', transcController.getTransc)
  .post('/', transcController.insertTransc)
  .put('/:id', transcController.updateTransStatus)
// .delete("/:id", cartsController.deleteCart);

module.exports = router
