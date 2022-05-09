const transcModel = require('../models/transcModel')
const createError = require('http-errors')
const errorServer = new createError.InternalServerError()

const getTransc = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit

    const id = req.params.id

    const result = await transcModel.select({ limit, offset, id })

    const { rows: [count] } = await transcModel.countTransc(id)
    const totalData = parseInt(count.total)
    const totalPage = Math.ceil(totalData / limit)
    const pagination = {
      currentPage: page,
      dataPerPage: limit,
      totalData,
      totalPage
    }

    res.status(200).json({
      status: 200,
      message: 'Get data success',
      pagination,
      data: result.rows
    })
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const insertTransc = async (req, res, next) => {
  const { idCart, name, phone, address, status } = req.body

  const data = {
    idCart,
    name,
    phone,
    address,
    status
  }

  try {
    await transcModel.insert(data)

    res.status(201).json({
      status: 201,
      message: 'insert data success',
      data
    })
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const updateTransStatus = async (req, res, next) => {
  const id = req.params.id
  const { idCart, name, phone, address, status } = req.body
  const updatedAt = new Date()

  console.log(idCart)

  const data = {
    idCart,
    name,
    phone,
    address,
    status,
    updatedAt
  }

  try {
    await transcModel.update(data, id)
    res.status(200).json({
      status: 200,
      message: 'Transaction Status successfully updated',
      data
    })
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

module.exports = {
  insertTransc,
  getTransc,
  updateTransStatus
}
