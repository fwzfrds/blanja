const usersModel = require('../models/usersModel')
const createError = require('http-errors')
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
      res.json({
        message: 'Data not found in this page'
      })
    }

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

    // res.status(500).json({
    //     message: "internal server error"
    // })
  }
}

const insertUsers = async (req, res, next) => {
  const { firstName, lastName, email, userPassword, phone, gender, birth, userAddress } = req.body

  const data = {
    firstName,
    lastName,
    email,
    userPassword,
    phone,
    gender,
    birth,
    userAddress
  }

  try {
    await usersModel.insert(data)

    res.status(201).json({
      status: 201,
      message: 'insert data success',
      data
    })
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
  const id = req.params.id
  const { firstName, lastName, email, userPassword, phone, gender, birth, userAddress } = req.body

  const data = {
    firstName,
    lastName,
    email,
    userPassword,
    phone,
    gender,
    birth,
    userAddress
  }

  try {
    await usersModel.update(data, id)
    res.status(200).json({
      status: 200,
      message: 'Data updated successfully',
      data
    })
  } catch (error) {
    console.log(error)
    next(errorServer)
    // res.status(500).json({
    //     message: 'internal server error'
    // })
  }
}

const deleteUsers = (req, res, next) => {
  const id = req.params.id

  try {
    usersModel.deleteUsers(id)
    res.json({
      message: 'Delete data success'
    })
  } catch (error) {
    console.log(error)
    next(errorServer)

    // res.status(500).json({
    //     message: "internal server error"
    // })
  }
}

module.exports = {
  getUsers,
  insertUsers,
  deleteUsers,
  updateUsers
}
