const express = require('express')
const router = express.Router()
const {
  getCategories,
  detailCategory,
  insertCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoriesController')

//  ----> /users.....
router
  .get('/', getCategories)
  .get('/:id', detailCategory)
  .post('/', insertCategory)
  .put('/:id', updateCategory)
  .delete('/:id', deleteCategory)

module.exports = router
