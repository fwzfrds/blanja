const productsModel = require('../models/productsModel')
const createError = require('http-errors')
// const xss = require('xss')
const { response, notFoundRes } = require('../helper/common')
const errorServer = new createError.InternalServerError()

const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit || 0

    const sortBy = req.query.sortby || 'id'
    const sortOrder = req.query.sortorder || 'asc'
    const search = req.query.search || ''

    const result = await productsModel.select({ limit, offset, sortBy, sortOrder, search })

    const { rows: [count] } = await productsModel.countProducts()
    const totalData = search === '' ? parseInt(count.total) : (result.rows).length

    if (totalData < limit) {
      limit = totalData
    }

    if ((result.rows).length === 0) {
      // res.status(200).json({
      //   message: 'Data not found in this page'
      // })
      notFoundRes(res, 404, 'Data not found')
    }

    const totalPage = Math.ceil(totalData / limit)
    const pagination = {
      currentPage: page,
      dataPerPage: limit,
      totalData,
      totalPage
    }

    // res.status(200).json({
    //     status: 200,
    //     message: 'Get data success',
    //     pagination,
    //     data: result.rows
    // })
    response(res, result.rows, 200, 'Get data success', pagination)
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const detailProduct = async (req, res) => {
  try {
    const id = req.params.id
    const result = await productsModel.getProductById(id)
    // res.json({
    //     data: result.rows[0]
    // })

    if ((result.rows).length === 0) {
      notFoundRes(res, 404, 'Data not found')
    }
    response(res, result.rows[0], 200, 'Get data success')
  } catch (error) {
    console.log(error)
  }
}

const insertProduct = async (req, res, next) => {
  const { name, description, qty, price, idCategory } = req.body

  const data = {
    name,
    description,
    qty,
    price,
    idCategory
  }

  try {
    await productsModel.insert(data)

    // res.status(201).json({
    //     status: 201,
    //     message: 'insert data success',
    //     data
    // })

    response(res, data, 201, 'Insert product data success')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const updateProduct = async (req, res, next) => {
  const id = req.params.id
  const { name, description, qty, price, idCategory } = req.body
  const updatedAt = new Date()

  const data = {
    name,
    description,
    qty,
    price,
    idCategory,
    updatedAt
  }

  try {
    const { rows: [count] } = await productsModel.checkExisting(id)
    const result = parseInt(count.total)

    if (result === 0) {
      notFoundRes(res, 404, 'Data not found, you cannot edit the data which is not exist')
    }

    await productsModel.update(data, id)
    // res.status(200).json({
    //     status: 200,
    //     message: 'Product Data updated successfully',
    //     data
    // })

    response(res, data, 200, 'Update data success')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const deleteProduct = async (req, res, next) => {
  const id = req.params.id

  try {
    const { rows: [count] } = await productsModel.checkExisting(id)

    const result = parseInt(count.total)

    console.log(result)
    if (result === 0) {
      notFoundRes(res, 404, 'Data not found, you cannot delete the data which is not exist')
    }

    await productsModel.deleteProduct(id)
    // res.json({
    //     message: 'Delete data success'
    // })

    response(res, id, 200, 'Delete data success')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

module.exports = {
  getProducts,
  detailProduct,
  insertProduct,
  updateProduct,
  deleteProduct
}
