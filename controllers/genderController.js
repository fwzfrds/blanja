const genderModel = require('../models/genderModel')

const createError = require('http-errors')
const { response } = require('../helper/common')
const errorServer = new createError.InternalServerError()

const insertGender = async (req, res, next) => {
  const { name } = req.body

  const data = {
    name
  }

  try {
    await genderModel.insert(data)

    response(res, data, 201, 'Insert gender name success')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

module.exports = {
  insertGender
}
