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

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const insert = ({ id, firstName, lastName, email, userPassword, phone, activationID, genderID, birth, userAddress }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users(id, first_name, last_name, email, user_password, phone, id_status, id_gender, birth, user_address)VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [id, firstName, lastName, email, userPassword, phone, activationID, genderID, birth, userAddress], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const checkExisting = (emailID) => {
  return pool.query(`SELECT COUNT(*) AS total FROM users WHERE email = '${emailID}';`)
}

const update = ({ firstName, lastName, email, userPassword, phone, activationStatus, gender, birth, userAddress }, emailID) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE users SET 
                  first_name = COALESCE(${firstName}, first_name), 
                  last_name = COALESCE(${lastName}, last_name), 
                  email = COALESCE(${email}, email),
                  user_password = COALESCE(${userPassword}, user_password), 
                  phone = COALESCE(${phone}, phone), 
                  id_status = COALESCE(${activationStatus}, id_status), 
                  id_gender = COALESCE(${gender}, id_gender), 
                  birth = COALESCE(${birth}, birth), 
                  user_address = COALESCE(${userAddress}, user_address) 
                  WHERE email = '${emailID}';`, (err, result) => {
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
  checkExisting,
  findByEmail
}
