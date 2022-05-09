const response = (res, result, status, message, pagination) => {
  const resultPrint = {}
  resultPrint.status = 'success'
  resultPrint.message = message || null
  resultPrint.statusCode = status
  if (pagination) resultPrint.pagination = pagination
  resultPrint.data = result
  res.status(status).json(resultPrint)
}

module.exports = {
  response
}
