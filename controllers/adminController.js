const adminModel = require('../models/adminModel')
const createError = require('http-errors')
const errorServer = new createError.InternalServerError()

const getAdmins = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 4
        const offset = (page - 1) * limit

        const result = await adminModel.select({ limit, offset })

        const { rows: [count] } = await adminModel.countAdmins()
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

const insertAdmin = async (req, res, next) => {
    const { name, email, phone } = req.body

    const data = {
        name,
        email,
        phone
    }

    try {

        await adminModel.insert(data)

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

const updateAdmin = async (req, res, next) => {
    const id = req.params.id
    const { name, email, phone } = req.body
    const updated_at = new Date()

    const data = {
        name,
        email,
        phone,
        updated_at
    }

    try {
        await adminModel.update(data, id)
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

module.exports = {
    getAdmins,
    insertAdmin,
    updateAdmin
}
