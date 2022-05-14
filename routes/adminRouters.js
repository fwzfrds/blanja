const express = require('express')
const router = express.Router()
const {
  getAdmins,
  registerAdmin,
  updateAdmin,
  loginAdmin,
  getAdminDetail
} = require('../controllers/adminController')
const { authorizedAdmin } = require('../middlewares/authMiddleware')

//  ----> /admin.....
router
  .get('/', getAdmins)
  .get('/profile', authorizedAdmin, getAdminDetail)
  .post('/registration', registerAdmin)
  .post('/login', loginAdmin)
  .put('/edit', authorizedAdmin, updateAdmin)
// .delete('/:id', categoriesController.deleteCategory)

module.exports = router
