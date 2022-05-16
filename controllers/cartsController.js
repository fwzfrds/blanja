const cartsModel = require('../models/cartsModel')
const productsModel = require('../models/productsModel')
const createError = require('http-errors')
const { response, notFoundRes } = require('../helper/common')
const errorServer = new createError.InternalServerError()

const getCarts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 4
    const offset = (page - 1) * limit

    const id = req.decoded.id

    const result = await cartsModel.select({ limit, offset, id })

    const { rows: [count] } = await cartsModel.countCarts(id)
    const totalData = parseInt(count.total)

    if (totalData < limit) {
      limit = totalData
    }

    if ((result.rows).length === 0) {
      return notFoundRes(res, 404, 'Your cart is empty, let\'s go shopping')
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
  const { idProduct, qty: productQty } = req.body
  const id = req.decoded.id

  // dummy body for update qty after product add to qty
  const { name, description, qty, price, idCategory } = req.body
  const updatedAt = new Date()

  const data = {
    idUser: id,
    idProduct,
    productQty
  }

  const dummyData = {
    name,
    description,
    qty,
    price,
    idCategory,
    updatedAt
  }

  try {
    // untuk cek apakah prduct tersebut sudah ada di dalam cart atau belum
    const { rows: [count] } = await cartsModel.checkByProduct(idProduct, id)
    const result = parseInt(count.total)

    // jika sudah maka
    if (result !== 0) {
      return notFoundRes(res, 403, 'The product is already in your shopping cart')
    }

    // Untuk dapatkan qty product yang di tambahkan ke dalam cart
    const { rows: [qtyCount] } = await productsModel.getProductQty(idProduct)
    console.log(qtyCount)
    const currentQty = parseInt(qtyCount.qty)

    // Jika qty productnya 0 maka kasih tau product sudah habis stocknya
    if (currentQty === 0) {
      return notFoundRes(res, 403, 'The product is out of stock')
    } else if (productQty > currentQty) {
      return notFoundRes(res, 403, 'Stock of this product is less than the amount you want')
    }

    // Tapi jika masih ada maka
    dummyData.qty = currentQty - productQty

    await productsModel.qtyUpdateFromCart(dummyData, idProduct)

    await cartsModel.insert(data)

    response(res, data, 200, 'The product has been added to your cart')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const updateCartQty = async (req, res, next) => {
  const idUserToken = req.decoded.id
  const idCart = req.params.id
  const { idUser, idProduct, qty } = req.body
  const updatedAt = new Date()

  const data = {
    idUser,
    idProduct,
    qty,
    updatedAt,
    idCart
  }

  try {
    const { rows: [count] } = await cartsModel.checkExisting(idCart)
    const result = parseInt(count.total)

    if (result === 0) {
      return notFoundRes(res, 403, 'Data not found, you cannot edit the data which is not exist')
    }

    const { rowCount } = await cartsModel.update(data, idUserToken)

    if (rowCount === 0) {
      return notFoundRes(res, 403, 'Data not found, you cannot delete the data which is not exist')
    }

    response(res, data, 200, 'Cart data successfully updated')
  } catch (error) {
    console.log(error)
    next(errorServer)
  }
}

const deleteCart = async (req, res, next) => {
  const idCart = req.params.id
  const idUser = req.decoded.id

  console.log(idUser)
  console.log(idCart)

  try {
    const { rows: [count] } = await cartsModel.checkExisting(idCart)
    const result = parseInt(count.total)

    if (result === 0) {
      return notFoundRes(res, 403, 'Data not found, you cannot delete the data which is not exist')
    }

    const { rowCount } = await cartsModel.deleteCart(idCart, idUser)

    if (rowCount === 0) {
      return notFoundRes(res, 403, 'Data not found, you cannot delete the data which is not exist')
    }

    response(res, idCart, 200, 'Cart data has been deleted')
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

/*
  kemungkinan bug yang akan ada setelah ini:
  pada perubahan stock jika ternyata user mengurangi atau menambah jumlah product yang ada pada cart
  perbaiki nanti jika tugas sudah selesai

*/
