require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const createError = require('http-errors')
const morgan = require('morgan')
const helmet = require('helmet')

const usersRouters = require('./routes/usersRouters')
const categoriesRouters = require('./routes/categoriesRouters')
const productsRouters = require('./routes/productsRouters')
const adminRouters = require('./routes/adminRouters')
const cartRouters = require('./routes/cartRouters')
const transactionsRouters = require('./routes/transactionsRouters')
// const midCors = require('./middlewares/cors')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
// app.use(midCors.myCors)

app.use('/users', usersRouters)
app.use('/categories', categoriesRouters)
app.use('/products', productsRouters)
app.use('/cart', cartRouters)
app.use('/admin', adminRouters)
app.use('/transactions', transactionsRouters)

app.all('*', (req, res, next) => {
  // Cara 1 : bawaan package
  next(new createError.NotFound())

  // Cara 2 : Custom status & message
  // res.status(404).json({
  //     status: 404,
  //     message: 'url not found'
  // })
})

app.use((err, req, res, next) => {
  const errorMessage = err.message || 'internal server error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    status: statusCode,
    message: errorMessage
  })
  // console.log(err);
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
