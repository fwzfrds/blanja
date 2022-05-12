const express = require('express')
const router = express.Router()
const {
  getAdmins,
  insertAdmin,
  updateAdmin
} = require('../controllers/adminController')

//  ----> /admin.....
router
  .get('/', getAdmins)
  .post('/', insertAdmin)
  .put('/:id', updateAdmin)
// .delete('/:id', categoriesController.deleteCategory)

module.exports = router
