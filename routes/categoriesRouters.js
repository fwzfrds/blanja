const express = require('express')
const router = express.Router()
const {
  getCategories,
  detailCategory,
  insertCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoriesController')
const { protect, isAdmin } = require('../middlewares/authMiddleware')

//  ----> /users.....
router
  .get('/', getCategories)
  .get('/:id', detailCategory)
  .post('/add', protect, isAdmin, insertCategory)
  .put('/edit/:id', protect, isAdmin, updateCategory)
  .delete('/:id', protect, isAdmin, deleteCategory)

module.exports = router
