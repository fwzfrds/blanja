const adminModel = require('../models/adminModel')
const usersModel = require('../models/usersModel')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const { response, notFoundRes } = require('../helper/common')
const { generateToken } = require('../helper/authHelper')
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

const getAdminDetail = async (req, res, next) => {
  const email = req.decoded.email
  const { rows: [admin] } = await adminModel.findByEmail(email)

  delete admin.password
  response(res, admin, 200, 'Get Data success')
}

const registerAdmin = async (req, res, next) => {
  const { name, email: emailID, password, phone } = req.body

  const salt = bcrypt.genSaltSync(10)
  const adminPassword = bcrypt.hashSync(password, salt)

  console.log(adminPassword)

  const data = {
    id: uuidv4(),
    name,
    email: emailID,
    adminPassword,
    phone
  }

  console.log(data)

  try {
    // Check Email in users's table
    const { rows: [count1] } = await usersModel.checkExisting(emailID)
    const result1 = parseInt(count1.total)
    console.log(result1)

    // Check Email in admin's table
    const { rows: [count2] } = await adminModel.checkByEmail(emailID)
    const result2 = parseInt(count2.total)
    console.log(result2)

    if (result1 !== 0) {
      notFoundRes(res, 403, 'Email has already been taken')
      return
    }

    if (result2 !== 0) {
      notFoundRes(res, 403, 'Email has already been taken')
      return
    }

    await adminModel.insert(data)
    delete data.adminPassword
    response(res, data, 201, 'Registration Succes')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { rows: [admin] } = await adminModel.findByEmail(email)
    // const user = rows[0]
    if (!admin) {
      return response(res, null, 403, 'wrong email or password')
    }

    const validPassword = bcrypt.compareSync(password, admin.password)
    if (!validPassword) {
      return response(res, null, 403, 'wrong email or password')
    }
    delete admin.password

    const payload = {
      email: admin.email,
      id: admin.id,
      role: 0
    }
    // generate token
    admin.token = generateToken(payload)
    admin.role = 'admin'

    response(res, admin, 200, 'Login Successful')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const updateAdmin = async (req, res, next) => {
  // const id = req.params.id
  const emailID = req.decoded.email
  const { name, email, phone } = req.body
  const updatedAt = new Date()

  const data = {
    name,
    email,
    phone,
    updatedAt
  }

  try {
    // const { rows: [count] } = await adminModel.checkByEmail(emailID)
    // const result = parseInt(count.total)

    await adminModel.update(data, emailID)

    response(res, data, 200, 'Admin data has just been updated')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

module.exports = {
  getAdmins,
  registerAdmin,
  updateAdmin,
  loginAdmin,
  getAdminDetail
}
