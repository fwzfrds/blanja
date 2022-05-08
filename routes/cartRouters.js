const express = require('express')
const router = express.Router()
const cartsController = require('../controllers/cartsController')

//  ----> /cart.....
router
    .get('/:id', cartsController.getCarts)
    // .get('/:id', productsController.detailProduct)
    .post('/', cartsController.insertCart)
    .put('/:id', cartsController.updateCartQty)
    .delete('/:id', cartsController.deleteCart)

module.exports = router