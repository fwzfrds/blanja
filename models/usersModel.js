const pool = require('../db')
const select = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users LIMIT $1 OFFSET $2', [limit, offset], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const insert = ({ firstName, lastName, email, userPassword, phone, gender, birth, userAddress }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users(first_name, last_name, email, user_password, phone, gender, birth, user_address)VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [firstName, lastName, email, userPassword, phone, gender, birth, userAddress], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const checkExisting = (id) => {
  return pool.query(`SELECT COUNT(*) AS total FROM users WHERE id = ${id}`)
}

const update = ({ firstName, lastName, email, userPassword, phone, gender, birth, userAddress }, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE users SET 
                  first_name = COALESCE($1, first_name), 
                  last_name = COALESCE($2, last_name), 
                  email = COALESCE($3, email),
                  user_password = COALESCE($4, user_password), 
                  phone = COALESCE($5, phone), 
                  gender = COALESCE($6, gender), 
                  birth = COALESCE($7, birth), 
                  user_address = COALESCE($8, user_address) 
                  WHERE id= $9`, [firstName, lastName, email, userPassword, phone, gender, birth, userAddress, id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const countUser = () => {
  return pool.query('SELECT COUNT(*) AS total FROM users')
}

const deleteUsers = (id) => {
  return pool.query('DELETE FROM users WHERE id = $1', [id])
}

module.exports = {
  select,
  insert,
  deleteUsers,
  update,
  countUser,
  checkExisting
}
