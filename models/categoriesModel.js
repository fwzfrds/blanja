const pool = require('../db')
const select = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM categories LIMIT $1 OFFSET $2', [limit, offset], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const countCategories = () => {
  return pool.query('SELECT COUNT(*) AS total FROM categories')
}

const insert = ({ name, description }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO categories(name, description)VALUES($1, $2)', [name, description], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const update = ({ name, description, updatedAt }, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE categories SET 
        name = COALESCE($1, name), 
        description = COALESCE($2, description), 
        updated_at = COALESCE($3, updated_at) 
        WHERE id = $4;`, [name, description, updatedAt, id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const deleteCategory = (id) => {
  return pool.query('DELETE FROM categories WHERE id = $1', [id])
}

module.exports = {
  select,
  insert,
  countCategories,
  update,
  deleteCategory
}
