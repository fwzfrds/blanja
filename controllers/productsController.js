const productsModel = require('../models/productsModel')
const createError = require('http-errors')
// const xss = require('xss')
const { response, notFoundRes } = require('../helper/common')
const errorServer = new createError.InternalServerError()
const cloudinary = require('../config/cloudinaryConfig')

const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
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

    for (let i = 0; i < (result.rows).length; i++) {
      const image = result.rows[i].image
      if (image) {
        result.rows[i].image = image.split(',')
      }
    }

    response(res, result.rows, 200, 'Get data success', pagination)
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const detailProduct = async (req, res) => {
  try {
    const id = req.params.id
    // console.log(id)
    const result = await productsModel.getProductById(id)
    // console.log(result.rows)

    if ((result.rows).length === 0) {
      return notFoundRes(res, 404, 'Data not found')
    }

    const image = result.rows[0].image
    console.log(image)
    if (image) {
      result.rows[0].image = image.split(',')
    }

    console.log(result.rows[0].image)
    // Sampai sini backend harus diperbaiki bagian image kalau satu

    response(res, result.rows[0], 200, 'Get data success')
  } catch (error) {
    console.log(error)
  }
}

const insertProduct = async (req, res, next) => {
  // console.log(req.files[0].filename)
  // console.log(req.files)
  const { name, description, qty, price, idCategory, condition } = req.body

  // upload single image
  //   if (req.file !== undefined) {
  //     photo = `http://${req.get('host')}/img/${req.file.filename}`
  //   }

  // upload multiple images
  // if (req.files) {
  //   req.files.forEach(item => {
  //     photo.push(`http://${req.get('host')}/img/${item.filename}`)
  //   })
  //   console.log(photo)
  // }
  const photo = []

  try {
    if (req.files) {
      const files = req.files

      await Promise.all(
        files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, { folder: 'blanja/products' })
          photo.push(result.url)
        })
      )
    }

    const photos = photo.toString()

    const data = {
      name,
      description,
      qty,
      price,
      idCategory,
      condition,
      photos
    }

    console.log(photo)
    console.log(data)

    await productsModel.insert(data)

    response(res, data, 201, 'Insert product data success')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const updateProduct = async (req, res, next) => {
  const id = req.params.id
  console.log((req.files).length)
  const { name, description, qty, price, idCategory } = req.body
  const updatedAt = new Date()
  let photo = []
  let photos

  // upload single image
  //   if (req.file !== undefined) {
  //     photo = `http://${req.get('host')}/img/${req.file.filename}`
  //   }

  // untuk mengatasi apabila gambar tidak diupdate supaya tidak jadi kosong
  if ((req.files).length === 0) {
    photo = undefined
  }

  // upload multiple images
  if (req.files) {
    req.files.forEach(item => {
      photo.push(`http://${req.get('host')}/img/${item.filename}`)
    })
  }

  console.log(photo)

  if (photo === undefined) {
    photos = undefined
  } else {
    photos = photo.toString()
  }

  console.log('This is photos:')
  console.log(photos)

  const data = {
    name,
    description,
    qty,
    price,
    idCategory,
    photos,
    updatedAt
  }

  // console.log(data.photos)

  try {
    const { rows: [count] } = await productsModel.checkExisting(id)
    const result = parseInt(count.total)

    if (result === 0) {
      return notFoundRes(res, 404, 'Data not found, you cannot edit the data which is not exist')
    }

    // perbaiki dibagian ini, pas data not found tapi gambar masih terupload

    await productsModel.update(data, id)

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

    if (result === 0) {
      notFoundRes(res, 404, 'Data not found, you cannot delete the data which is not exist')
    }

    productsModel.deleteProduct(id)

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
