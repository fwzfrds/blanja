const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

//  ----> /users.....
router
  .get('/', usersController.getUsers)
  .post('/', usersController.insertUsers)
  .put('/:id', usersController.updateUsers)
  .delete('/:id', usersController.deleteUsers)

module.exports = router
