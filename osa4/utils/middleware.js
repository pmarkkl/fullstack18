const logger = (request, response, next) => {
  if ( process.env.NODE_ENV === 'test' ) {
    return next()
  }
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  if ( process.env.NODE_ENV === 'test' ) {
    return next()
  }
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
  }
  next()
}

module.exports = {
  logger,
  error,
  tokenExtractor
}