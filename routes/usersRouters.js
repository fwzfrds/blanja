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
const { authorizedUser } = require('../middlewares/authMiddleware')

//  ----> /users.....
router
  .get('/', getUsers)
  .get('/profile/:emailid', authorizedUser, getProfileDetail)
  .post('/registration', insertUsers)
  .post('/login', loginUsers)
  .put('/:emailid', updateUsers)
  .delete('/:emailid', deleteUsers)

module.exports = router
