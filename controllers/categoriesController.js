const categoriesModel = require('../models/categoriesModel')
const createError = require('http-errors')
const errorServer = new createError.InternalServerError()

const getCategories = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 4
        const offset = (page - 1) * limit

        const result = await categoriesModel.select({ limit, offset })

        const { rows: [count] } = await categoriesModel.countCategories()
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

const insertCategory = async (req, res, next) => {
    const { name, description } = req.body

    const data = {
        name,
        description
    }

    try {

        await categoriesModel.insert(data)

        res.status(201).json({
            status: 201,
            message: 'insert data success',
            data
        })

    } catch (error) {

        console.log(error);
        next(errorServer)

    }
}

const updateCategory = async (req, res, next) => {
    const id = req.params.id
    const { name, description } = req.body
    const updated_at = new Date()

    const data = {
        name,
        description,
        updated_at
    }

    try {
        await categoriesModel.update(data, id)
        res.status(200).json({
            status: 200,
            message: 'Category Data updated successfully',
            data
        })

    } catch (error) {
        console.log(error)
        next(errorServer)
    }

}

const deleteCategory = (req, res, next) => {
    const id = req.params.id

    try {
        categoriesModel.deleteCategory(id)
        res.json({
            message: 'Delete data success'
        })
    } catch (error) {
        console.log(error)
        next(errorServer)
    }
}


module.exports = {
    getCategories,
    insertCategory,
    updateCategory,
    deleteCategory
}