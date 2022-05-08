const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

//  ----> /admin.....
router
    .get('/', adminController.getAdmins)
    .post('/', adminController.insertAdmin)
    .put('/:id', adminController.updateAdmin)
// .delete('/:id', categoriesController.deleteCategory)

module.exports = router