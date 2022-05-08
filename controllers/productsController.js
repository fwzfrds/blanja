const productsModel = require('../models/productsModel')
const createError = require('http-errors')
const errorServer = new createError.InternalServerError()

const getProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 4
        const offset = (page - 1) * limit

        const sortBy = req.query.sortby
        const sortOrder = req.query.sortorder
        const search = req.query.search

        const result = await productsModel.select({ limit, offset, sortBy, sortOrder, search })

        const { rows: [count] } = await productsModel.countProducts()
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

const detailProduct = async (req, res) => {
    try {
        const id = req.params.id
        const result = await productsModel.getProductById(id)
        res.json({
            data: result.rows[0]
        })
    } catch (error) {
        console.log(error)
    }
}

const insertProduct = async (req, res, next) => {
    const { name, description, qty, price, id_category } = req.body

    const data = {
        name,
        description,
        qty,
        price,
        id_category
    }

    try {

        await productsModel.insert(data)

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

const updateProduct = async (req, res, next) => {
    const id = req.params.id
    const { name, description, qty, price, id_category } = req.body
    const updated_at = new Date()

    const data = {
        name,
        description,
        qty,
        price,
        id_category,
        updated_at
    }

    try {
        await productsModel.update(data, id)
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

const deleteProduct = (req, res, next) => {
    const id = req.params.id

    try {
        productsModel.deleteProduct(id)
        res.json({
            message: 'Delete data success'
        })
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