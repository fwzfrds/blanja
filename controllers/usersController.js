const usersModel = require('../models/usersModel')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const { response, notFoundRes } = require('../helper/common')

const errorServer = new createError.InternalServerError()

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit

    const result = await usersModel.select({ limit, offset })

    const { rows: [count] } = await usersModel.countUser()
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

    const dob = new Date('12/11/1981')
    console.log(dob)

    response(res, result.rows, 200, 'Get data success', pagination)
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const getProfileDetail = async (req, res, next) => {
  const emailID = req.params.emailid
  const { rows: [user] } = await usersModel.findByEmail(emailID)
  delete user.user_password
  response(res, user, 200, 'Get Data success')
}

const insertUsers = async (req, res, next) => {
  const { firstName, lastName, email, password, phone, activationID, genderID, birth, userAddress } = req.body

  const salt = bcrypt.genSaltSync(10)
  const userPassword = bcrypt.hashSync(password, salt)

  const data = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    userPassword,
    phone,
    activationID: activationID || 0,
    genderID: genderID || 0,
    birth,
    userAddress
  }

  try {
    await usersModel.insert(data)
    response(res, data, 201, 'Insert user data success')
  } catch (error) {
    console.log(error)
    // Cara 4 : menggunakan package
    // a. menggunakan custom status & message
    // next(createError(500, 'Ada error di input anda'))
    // b. menggunakan status & message bawaan
    // next(new createError.InternalServerError())
    next(errorServer)

    // Cara 1
    // const error = new Error('Insert User Error!')
    // error.status = 500
    // next(error)

    // Cara 2
    // next({ message: 'Insert User Error!', status: 500 })

    // Cara 3
    // res.status(500).json({
    //     message: "internal server error"
    // })
  }

  // usersModel.insert(data)
  //     .then(() => {
  //         res.status(200).json({
  //             message: 'insert data success',
  //             data
  //         })
  //     })
  //     .catch((error) => {
  //         console.log(error)
  // next(errorServ)
  // cara 1
  //   const error = new Error('ada error id insert cateogry')
  //   error.status = 500
  //   next(error)
  // cara 2
  // next({message: 'ada error bro', status: 500})
  // cara 3
  //   next(createError(500, 'ada error di input anda'))
  //   next(new createError.NotFound())
  // })
}

const updateUsers = async (req, res, next) => {
  const emailID = req.params.emailid
  const { firstName, lastName, email, userPassword, phone, activationStatus, gender, birth, userAddress } = req.body

  const data = {
    firstName,
    lastName,
    email,
    userPassword,
    phone,
    activationStatus,
    gender,
    birth,
    userAddress
  }

  console.log(data)

  try {
    const { rows: [count] } = await usersModel.checkExisting(emailID)
    const result = parseInt(count.total)

    console.log(result)

    if (result === 0) {
      notFoundRes(res, 404, 'Data not found, you cannot edit the data which is not exist')
    }

    await usersModel.update(data, emailID)
    response(res, data, 200, 'User data has just been updated')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const deleteUsers = (req, res, next) => {
  const id = req.params.id

  try {
    usersModel.deleteUsers(id)
    response(res, id, 200, 'User data has just been deleted')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

module.exports = {
  getUsers,
  insertUsers,
  deleteUsers,
  updateUsers,
  getProfileDetail
}
