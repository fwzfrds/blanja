const pool = require('../db')

const select = ({ limit, offset, id }) => {
  console.log(id)
  return new Promise((resolve, reject) => {
    // pool.query(`SELECT * FROM transactions WHERE id_cart = ${id} LIMIT ${limit} OFFSET ${offset};`, (err, result) => {
    pool.query(`SELECT transactions.id, 
                  transactions.id_cart, 
                  transactions.name,
                  transactions.address, 
                  transactions.phone, 
                  transactions.status, 
                  transactions.total, 
                  carts.id_product,  
                  products.name AS product_name,
                  products.image,
                  carts.qty, 
                  users.first_name, 
                  users.last_name 
                  FROM transactions 
                  INNER JOIN carts ON transactions.id_cart = carts.id 
                  INNER JOIN users ON iduser = users.id 
                  INNER JOIN products ON carts.id_product = products.id 
                  WHERE iduser = ${id} LIMIT ${limit} OFFSET ${offset};`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const countTransc = (id) => {
  // return pool.query(`SELECT COUNT(*) AS total FROM transactions WHERE id_cart='${id}'`)
  return pool.query(`SELECT COUNT(*) FROM 
  (
    SELECT transactions.id, transactions.id_cart, transactions.name, transactions.phone, 
           carts.id_product,carts.id_user, carts.qty, 
           users.first_name, products.name 
    FROM transactions INNER JOIN carts ON transactions.id_cart = carts.id 
    INNER JOIN users ON carts.id_user = users.id INNER JOIN products ON carts.id_product = products.id WHERE id_user = ${id}
  ) AS total;`)
  // perbaiki bagian count ini supaya count transaction berdasarkan id user
}

const insert = ({ idCart, name, phone, address, total, idUser }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO transactions(id_cart, name, phone, address, total, iduser)VALUES($1, $2, $3, $4, $5, $6)', [idCart, name, phone, address, total, idUser], (err, result) => {
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
