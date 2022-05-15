const express = require('express')
const router = express.Router()
const {
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers,
  getProfileDetail,
  loginUsers
} = require('../controllers/usersController')
const { protect, isUser } = require('../middlewares/authMiddleware')

//  ----> /users.....
router
  .get('/', getUsers)
  .get('/profile', protect, isUser, getProfileDetail)
  .post('/registration', insertUsers)
  .post('/login', loginUsers)
  .put('/edit', protect, isUser, updateUsers)
  .delete('/:emailid', deleteUsers)

module.exports = router
