const express = require('express')
const BlogRouter = express.Router()
const Blog = require('../models/blog.js')
const cors = require('cors')
const logger = require('../utils/logger')

BlogRouter.use(express.json())
BlogRouter.use(cors())

BlogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

  BlogRouter.post('/', (request, response) => {
    logger.info(request.body)
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

module.exports = BlogRouter