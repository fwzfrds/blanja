const express = require('express')
const router = express.Router()
const {
  getAdmins,
  registerAdmin,
  updateAdmin,
  loginAdmin,
  getAdminDetail
} = require('../controllers/adminController')
const { protect, isAdmin } = require('../middlewares/authMiddleware')

//  ----> /admin.....
router
  .get('/', getAdmins)
  .get('/profile', protect, isAdmin, getAdminDetail)
  .post('/registration', registerAdmin)
  .post('/login', loginAdmin)
  .put('/edit', protect, isAdmin, updateAdmin)
// .delete('/:id', categoriesController.deleteCategory)

module.exports = router
