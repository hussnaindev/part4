const express = require('express')
const app = express()
const BlogRouter = require('./controllers/BlogRouter')

app.use('/api/blogs',BlogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})