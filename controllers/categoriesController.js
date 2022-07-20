const categoriesModel = require('../models/categoriesModel')
const createError = require('http-errors')
const { response, notFoundRes } = require('../helper/common')
const errorServer = new createError.InternalServerError()

const getCategories = async (req, res, next) => {
  try {
    // const page = parseInt(req.query.page) || 1
    // let limit = parseInt(req.query.limit) || 4
    // const offset = (page - 1) * limit

    // const result = await categoriesModel.select({ limit, offset })
    const result = await categoriesModel.select()

    // const { rows: [count] } = await categoriesModel.countCategories()
    // const totalData = parseInt(count.total)

    // if (totalData < limit) {
    //   limit = totalData
    // }

    if ((result.rows).length === 0) {
      return notFoundRes(res, 404, 'Data not found')
    }

    // const totalPage = Math.ceil(totalData / limit)
    // const pagination = {
    //   currentPage: page,
    //   dataPerPage: limit,
    //   totalData,
    //   totalPage
    // }
    // response(res, result.rows, 200, 'Get data success', pagination)
    response(res, result.rows, 200, 'Get data success')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const detailCategory = async (req, res) => {
  try {
    const id = req.params.id
    const result = await categoriesModel.getCategoryById(id)
    // res.json({
    //     data: result.rows[0]
    // })

    if ((result.rows).length === 0) {
      return notFoundRes(res, 404, 'Data not found')
    }
    response(res, result.rows[0], 200, 'Get data success')
  } catch (error) {
    console.log(error)
  }
}

const insertCategory = async (req, res, next) => {
  const { name, description } = req.body

  const data = {
    name,
    description
  }

  try {
    await categoriesModel.insert(data)
    response(res, data, 201, 'Insert category data success')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const updateCategory = async (req, res, next) => {
  const id = req.params.id
  const { name, description } = req.body
  const updatedAt = new Date()

  const data = {
    name,
    description,
    updatedAt
  }

  try {
    const { rows: [count] } = await categoriesModel.checkExisting(id)
    const result = parseInt(count.total)

    if (result === 0) {
      return notFoundRes(res, 404, 'Data not found, you cannot edit the data which is not exist')
    }

    await categoriesModel.update(data, id)
    response(res, data, 200, 'Category data has been successfully updated')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const deleteCategory = async (req, res, next) => {
  const id = req.params.id

  try {
    const { rows: [count] } = await categoriesModel.checkExisting(id)
    const result = parseInt(count.total)

    if (result === 0) {
      return notFoundRes(res, 404, 'Data not found, you cannot delete data which is not exist')
    }

    await categoriesModel.deleteCategory(id)
    response(res, id, 200, 'Category data has been successfully deleted')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

module.exports = {
  getCategories,
  detailCategory,
  insertCategory,
  updateCategory,
  deleteCategory
}
