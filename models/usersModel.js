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

const insert = ({ first_name, last_name, email, user_password, phone, gender, birth, user_address }) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO users(first_name, last_name, email, user_password, phone, gender, birth, user_address)VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [first_name, last_name, email, user_password, phone, gender, birth, user_address], (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
        })
    })
}

const update = ({ first_name, last_name, email, user_password, phone, gender, birth, user_address }, id) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE users SET first_name = $1, last_name = $2, email = $3, user_password = $4, phone = $5, gender = $6, birth = $7, user_address = $8 WHERE id= $9", [first_name, last_name, email, user_password, phone, gender, birth, user_address, id], (err, result) => {
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
    countUser
}