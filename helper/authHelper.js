const jwt = require('jsonwebtoken')
const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: '5h'
    // issuer: 'Blanja'
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts)
  return token
}

const generateRefreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: '24h'
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT_2, verifyOpts)
  return token
}

module.exports = {
  generateToken,
  generateRefreshToken
}
