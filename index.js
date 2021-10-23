const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
const logger = require('./utils/logger')

app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login', loginRouter)


const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = app