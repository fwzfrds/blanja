const pool = require('../db')

const select = ({ limit, offset, id }) => {
    return new Promise((resolve, reject) => {
        // pool.query(`SELECT * FROM carts WHERE id_user='${id}' LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        pool.query(`SELECT carts.*, 
                    products.name AS name_product,
                    products.price AS price_product
                    FROM carts INNER JOIN products ON 
                    carts.id_product = products.id WHERE carts.id_user = ${id}
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

const insert = ({ id_user, id_product, qty }) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO carts(id_user, id_product, qty)VALUES($1, $2, $3)", [id_user, id_product, qty], (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
        })
    })
}

const update = ({ id_user, id_product, qty, updated_at, idProductQuery }, idUserParams) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE carts SET 
            id_user = COALESCE($1, id_user), 
            id_product = COALESCE($2, id_product), 
            qty = COALESCE($3, qty),  
            updated_at = COALESCE($4, updated_at)
            WHERE id_user = $5 AND id_product = $6;`, [id_user, id_product, qty, updated_at, idUserParams, idProductQuery], (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
        })
    })
}

const deleteCart = (id) => {
    return pool.query('DELETE FROM carts WHERE id = $1', [id])
}

module.exports = {
    select,
    insert,
    countCarts,
    deleteCart,
    update
}