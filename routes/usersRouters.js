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
const { authorizedUser, isUser } = require('../middlewares/authMiddleware')

//  ----> /users.....
router
  .get('/', getUsers)
  .get('/profile', authorizedUser, isUser, getProfileDetail)
  .post('/registration', insertUsers)
  .post('/login', loginUsers)
  .put('/edit', authorizedUser, updateUsers)
  .delete('/:emailid', deleteUsers)

module.exports = router
