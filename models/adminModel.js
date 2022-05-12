const pool = require('../db')
const select = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM admins LIMIT $1 OFFSET $2', [limit, offset], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const countAdmins = () => {
  return pool.query('SELECT COUNT(*) AS total FROM admins')
}

const insert = ({ name, email, phone }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO admins(name, email, phone)VALUES($1, $2, $3)', [name, email, phone], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const checkExisting = (id) => {
  return pool.query(`SELECT COUNT(*) AS total FROM admins WHERE id = ${id}`)
}

const update = ({ name, email, phone, updatedAt }, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE admins SET 
        name = COALESCE($1, name), 
        email = COALESCE($2, email), 
        phone = COALESCE($3, phone), 
        updated_at = COALESCE($4, updated_at) 
        WHERE id = $5;`, [name, email, phone, updatedAt, id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

module.exports = {
  select,
  countAdmins,
  insert,
  update,
  checkExisting
}
