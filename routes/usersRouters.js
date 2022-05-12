const express = require('express')
const router = express.Router()
const {
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers
} = require('../controllers/usersController')

//  ----> /users.....
router
  .get('/', getUsers)
  .post('/', insertUsers)
  .put('/:id', updateUsers)
  .delete('/:id', deleteUsers)

module.exports = router
