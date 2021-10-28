const logger = require('./logger')
const Blog = require('./blog.js')

const tokenExtractor = (request,response,next) =>
{
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
  }
  else if(!authorization && !authorization.toLowerCase().startsWith('bearer '))
  {
        request.token = null
  }
  next()
}

const userExtractor = (request,response,next) =>
{
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
  }
  else if(!authorization && !authorization.toLowerCase().startsWith('bearer '))
  {
        request.token = null
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  logger.info(decodedToken)
  if (!request.token || !decodedToken.id) 
  {
    request.user = null
  }
  else
  {
    request.user = await User.findById(decodedToken.id)
  }

  next()
}

const unknownEndpoint = (request, response) =>
 {
    response.status(404).send({ error: 'unknown endpoint' })
 }
  
  const errorHandler = (error, request, response, next) => {
    
    logger.error(error.message)

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
      return response.status(400).json({
        error: error.message 
      })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    }
    else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
    next(error)
  }
  
module.exports = {unknownEndpoint,errorHandler,tokenExtractor,userExtractor}