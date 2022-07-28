const transcModel = require('../models/transcModel')
const createError = require('http-errors')
const { response } = require('../helper/common')
const errorServer = new createError.InternalServerError()

const getTransc = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit

    const id = `'${req.decoded.id}'`

    const result = await transcModel.select({ limit, offset, id })

    const { rows: [count] } = await transcModel.countTransc(id)
    const totalData = parseInt(count.count)
    console.log(totalData)

    limit = totalData < limit ? totalData : limit
    // if (totalData < limit) {
    //   limit = totalData
    // }

    console.log(limit)

    const totalPage = Math.ceil(totalData / limit)
    const pagination = {
      currentPage: page,
      dataPerPage: limit,
      totalData,
      totalPage
    }

    const products = result.rows
    if (products) {
      products.forEach(item => {
        item.image = (item.image).split(',')
      })
    }

    response(res, result.rows, 200, 'Get Checkout List Success', pagination)
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const insertTransc = async (req, res, next) => {
  const idUser = req.decoded.id

  const { idCart, name, phone, address, total } = req.body

  const data = {
    idCart,
    name,
    phone,
    address,
    idUser,
    total
  }

  console.log(data)

  try {
    await transcModel.insert(data)

    response(res, data, 200, 'Checkout Success')
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
    // res.status(200).json({
    //   status: 200,
    //   message: 'Transaction Status successfully updated',
    //   data
    // })

    response(res, data, 200, 'Update Checkout Success')
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
