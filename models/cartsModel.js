const pool = require('../db')

const select = ({ limit, offset, id }) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT products.name AS name_product,
                    products.price AS price_product,
                    products.image AS product_image,
                    carts.qty
                    FROM carts INNER JOIN products 
                    ON carts.id_product = products.id
                    WHERE carts.id_user = '${id}'
                    LIMIT ${limit} OFFSET ${offset};`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const countCarts = (id) => {
  return pool.query(`SELECT COUNT(*) AS total FROM carts WHERE id_user='${id}'`)
}

const checkById = (idProduct) => {
  return pool.query(`SELECT COUNT(*) AS total FROM carts WHERE id = ${idProduct}`)
}

const insert = ({ idUser, idProduct, productQty }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO carts(id_user, id_product, qty)VALUES($1, $2, $3)', [idUser, idProduct, productQty], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const checkExisting = (idCart) => {
  return pool.query(`SELECT COUNT(*) AS total FROM carts WHERE id = ${idCart}`)
}

const checkByProduct = (idProduct, id) => {
  return pool.query(`SELECT COUNT(*) AS total FROM carts WHERE id_product = ${idProduct} AND id_user = '${id}'`)
}

const update = ({ idUser, idProduct, qty, updatedAt, idCart }, idUserToken) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE carts SET 
            id_user = COALESCE($1, id_user), 
            id_product = COALESCE($2, id_product), 
            qty = COALESCE($3, qty),  
            updated_at = COALESCE($4, updated_at)
            WHERE id = $5 AND id_user = $6;`, [idUser, idProduct, qty, updatedAt, idCart, idUserToken], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const deleteCart = (idCart, idUser) => {
  return pool.query(`DELETE FROM carts WHERE id = ${idCart} AND id_user = '${idUser}'`)
}

module.exports = {
  select,
  insert,
  countCarts,
  deleteCart,
  update,
  checkExisting,
  checkById,
  checkByProduct
}
