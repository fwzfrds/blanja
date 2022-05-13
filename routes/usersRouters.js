const express = require('express')
const router = express.Router()
const {
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers,
  getProfileDetail
} = require('../controllers/usersController')

//  ----> /users.....
router
  .get('/', getUsers)
  .get('/profile/:emailid', getProfileDetail)
  .post('/', insertUsers)
  .put('/:emailid', updateUsers)
  .delete('/:id', deleteUsers)

module.exports = router
