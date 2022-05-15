const express = require('express')
const router = express.Router()
const usersRouters = require('./usersRouters')
const categoriesRouters = require('./categoriesRouters')
const productsRouters = require('./productsRouters')
const adminRouters = require('./adminRouters')
const cartRouters = require('./cartRouters')
const transactionsRouters = require('./transactionsRouters')
const activationRouters = require('./activationRouters')
const genderRouters = require('./genderRouters')

router
  .use('/users', usersRouters)
  .use('/categories', categoriesRouters)
  .use('/products', productsRouters)
  .use('/cart', cartRouters)
  .use('/admin', adminRouters)
  .use('/transactions', transactionsRouters)
  .use('/activation', activationRouters)
  .use('/gender', genderRouters)

module.exports = router
