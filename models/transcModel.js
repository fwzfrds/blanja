const pool = require('../db')

const select = ({ limit, offset, id }) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM transactions WHERE id_cart = ${id} LIMIT ${limit} OFFSET ${offset};`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const countTransc = (id) => {
  return pool.query(`SELECT COUNT(*) AS total FROM transactions WHERE id_cart='${id}'`)
}

const insert = ({ idCart, name, phone, address, status }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO transactions(id_cart, name, phone, address, status)VALUES($1, $2, $3, $4, $5)', [idCart, name, phone, address, status], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const update = ({ idCart, name, phone, address, status, updatedAt }, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE transactions SET 
            id_cart = COALESCE($1, id_cart), 
            name = COALESCE($2, name), 
            phone = COALESCE($3, phone),  
            address = COALESCE($4, address),  
            status = COALESCE($5, status),  
            updated_at = COALESCE($6, updated_at)
            WHERE id = $7;`, [idCart, name, phone, address, status, updatedAt, id], (err, result) => {
      if (!err) {
        console.log(idCart)
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

module.exports = {
  insert,
  select,
  countTransc,
  update
}
