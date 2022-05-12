const cartsModel = require('../models/cartsModel')
const createError = require('http-errors')
const { response, notFoundRes } = require('../helper/common')
const errorServer = new createError.InternalServerError()

const getCarts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit

    const id = req.params.id

    const result = await cartsModel.select({ limit, offset, id })

    const { rows: [count] } = await cartsModel.countCarts(id)
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

const insertCart = async (req, res, next) => {
  const { idUser, idProduct, qty } = req.body

  const data = {
    idUser,
    idProduct,
    qty
  }

  try {
    await cartsModel.insert(data)

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

const updateCartQty = async (req, res, next) => {
  const idUserParams = req.params.id
  const { idUser, idProduct, qty } = req.body
  const { idproduct: idProductQuery } = req.query
  const updatedAt = new Date()

  const data = {
    idUser,
    idProduct,
    qty,
    updatedAt,
    idProductQuery
  }

  try {
    await cartsModel.update(data, idUserParams)
    res.status(200).json({
      status: 200,
      message: 'Product Data updated successfully',
      data
    })
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const deleteCart = (req, res, next) => {
  const id = req.params.id

  try {
    cartsModel.deleteCart(id)
    res.json({
      message: 'Delete data success'
    })
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

module.exports = {
  getCarts,
  insertCart,
  deleteCart,
  updateCartQty
}

// terakhir sampai sini