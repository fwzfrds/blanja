const express = require('express')
const router = express.Router()
const { insertGender } = require('../controllers/genderController')
const { protect, isAdmin } = require('../middlewares/authMiddleware')

//  ----> /gender.....
router
  .post('/', protect, isAdmin, insertGender)

module.exports = router
