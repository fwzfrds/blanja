const pool = require('../db')
const select = ({ limit, offset, sortBy, sortOrder, search }) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM products WHERE name ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const getProductById = (id) => {
  console.log(id)
  return pool.query('SELECT products.*, categories.name AS name_category FROM products INNER JOIN categories ON products.id_category = categories.id WHERE products.id = $1', [id])
}

const countProducts = () => {
  return pool.query('SELECT COUNT(*) AS total FROM products')
}

const insert = ({ name, description, qty, price, idCategory, photos, condition }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO products(name, description, qty, price, id_category, image, condition)VALUES($1, $2, $3, $4, $5, $6, $7)', [name, description, qty, price, idCategory, photos, condition], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const update = ({ name, description, qty, price, idCategory, photos, updatedAt, condition }, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE products SET 
            name = COALESCE($1, name), 
            description = COALESCE($2, description), 
            qty = COALESCE($3, qty), 
            price = COALESCE($4, price), 
            id_category = COALESCE($5, id_category), 
            image = COALESCE($6, image), 
            updated_at = COALESCE($7, updated_at),
            condition = COALESCE($8, condition)
            WHERE id = $9;`, [name, description, qty, price, idCategory, photos, updatedAt, condition, id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const getProductQty = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT products.qty FROM products WHERE id = ${id};`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const qtyUpdateFromCart = ({ name, description, qty, price, idCategory, updatedAt }, idProduct) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE products SET 
            name = COALESCE($1, name), 
            description = COALESCE($2, description), 
            qty = COALESCE($3, qty), 
            price = COALESCE($4, price), 
            id_category = COALESCE($5, id_category), 
            updated_at = COALESCE($6, updated_at)
            WHERE id = $7;`, [name, description, qty, price, idCategory, updatedAt, idProduct], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const checkExisting = (id) => {
  return pool.query(`SELECT COUNT(*) AS total FROM products WHERE id = ${id}`)
}

const deleteProduct = (id) => {
  return pool.query('DELETE FROM products WHERE id = $1', [id])
}

module.exports = {
  select,
  getProductById,
  countProducts,
  insert,
  update,
  checkExisting,
  deleteProduct,
  qtyUpdateFromCart,
  getProductQty
}
