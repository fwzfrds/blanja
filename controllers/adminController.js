const adminModel = require('../models/adminModel')
const createError = require('http-errors')
const { response, notFoundRes } = require('../helper/common')
const errorServer = new createError.InternalServerError()

const getAdmins = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit

    const result = await adminModel.select({ limit, offset })

    const { rows: [count] } = await adminModel.countAdmins()
    const totalData = parseInt(count.total)

    if (totalData < limit) {
      limit = totalData
    }

    if ((result.rows).length === 0) {
      notFoundRes(res, 404, 'Data not found')
    }

    const totalPage = Math.ceil(totalData / limit)
    const pagination = {
      currentPage: page,
      dataPerPage: limit,
      totalData,
      totalPage
    }

    response(res, result.rows, 200, 'Get data success', pagination)
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const insertAdmin = async (req, res, next) => {
  const { name, email, phone } = req.body

  const data = {
    name,
    email,
    phone
  }

  try {
    await adminModel.insert(data)
    response(res, data, 201, 'Insert admin data success')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const updateAdmin = async (req, res, next) => {
  const id = req.params.id
  const { name, email, phone } = req.body
  const updatedAt = new Date()

  const data = {
    name,
    email,
    phone,
    updatedAt
  }

  try {
    const { rows: [count] } = await adminModel.checkExisting(id)
    const result = parseInt(count.total)

    console.log(result)
    if (result === 0) {
      notFoundRes(res, 404, 'Data not found, you cannot edit the data which is not exist')
    }

    await adminModel.update(data, id)

    response(res, data, 200, 'Admin data has just been updated')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

module.exports = {
  getAdmins,
  insertAdmin,
  updateAdmin
}
