const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categoriesController')

//  ----> /users.....
router
  .get('/', categoriesController.getCategories)
  .post('/', categoriesController.insertCategory)
  .put('/:id', categoriesController.updateCategory)
  .delete('/:id', categoriesController.deleteCategory)

module.exports = router
