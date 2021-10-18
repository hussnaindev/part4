const express = require('express')
const app = express()
const BlogRouter = require('./controllers/BlogRouter')
const logger = require('./utils/logger')

app.use('/api/blogs',BlogRouter)

const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = app