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
  return pool.query('SELECT products.*, categories.name AS name_category FROM products INNER JOIN categories ON products.id_category = categories.id WHERE products.id = $1', [id])
}

const countProducts = () => {
  return pool.query('SELECT COUNT(*) AS total FROM products')
}

const insert = ({ name, description, qty, price, idCategory }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO products(name, description, qty, price, id_category)VALUES($1, $2, $3, $4, $5)', [name, description, qty, price, idCategory], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const update = ({ name, description, qty, price, idCategory, updatedAt }, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE products SET 
            name = COALESCE($1, name), 
            description = COALESCE($2, description), 
            qty = COALESCE($3, qty), 
            price = COALESCE($4, price), 
            id_category = COALESCE($5, id_category), 
            updated_at = COALESCE($6, updated_at)
            WHERE id = $7;`, [name, description, qty, price, idCategory, updatedAt, id], (err, result) => {
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
  deleteProduct
}
