const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
const logger = require('./utils/logger')

app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)


const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = app