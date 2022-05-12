const express = require('express')
const router = express.Router()
const usersRouters = require('./usersRouters')
const categoriesRouters = require('./categoriesRouters')
const productsRouters = require('./productsRouters')
const adminRouters = require('./adminRouters')
const cartRouters = require('./cartRouters')
const transactionsRouters = require('./transactionsRouters')

router
  .use('/users', usersRouters)
  .use('/categories', categoriesRouters)
  .use('/products', productsRouters)
  .use('/cart', cartRouters)
  .use('/admin', adminRouters)
  .use('/transactions', transactionsRouters)

module.exports = router
