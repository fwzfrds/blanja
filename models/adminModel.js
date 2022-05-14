const pool = require('../db')
// const { findByEmail } = require('./usersModel')
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

const insert = ({ id, name, email, adminPassword, phone }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO admins(id, name, email, password, phone)VALUES($1, $2, $3, $4, $5)', [id, name, email, adminPassword, phone], (err, result) => {
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

const checkByEmail = (emailID) => {
  return pool.query(`SELECT COUNT(*) AS total FROM admins WHERE email = '${emailID}';`)
}

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM admins WHERE email = '${email}';`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const update = ({ name, email, phone, updatedAt }, emailID) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE admins SET 
        name = COALESCE($1, name), 
        email = COALESCE($2, email), 
        phone = COALESCE($3, phone), 
        updated_at = COALESCE($4, updated_at) 
        WHERE email = '${emailID}';`, [name, email, phone, updatedAt], (err, result) => {
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
  checkExisting,
  checkByEmail,
  findByEmail
}
