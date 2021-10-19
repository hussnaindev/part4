const express = require('express')
const BlogRouter = express.Router()
const Blog = require('../models/blog.js')
const cors = require('cors')
const logger = require('../utils/logger')

BlogRouter.use(express.json())
BlogRouter.use(cors())

BlogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    if(blogs)
    {
      response.json(blogs)
    }
    else
    {
      response.status(404).end()
    }
    
  })

  BlogRouter.post('/', async (request, response) => {
    logger.info(request.body)
    const blog = new Blog(request.body)

    if(blog.url==='' || blog.title==='')
    {
      response.status(400).end()
    }
    else
    {
      await blog.save()
      response.status(201).json(blog)
    }

  })

  BlogRouter.delete('/:id', async (request, response) => {

    const found = await Blog.findByIdAndDelete(request.params.id)
    if(found)
    {
      response.status(204).send()
    }
    else
    {
      response.status(400).json({error: "blog not found"})
    }
    
  })

module.exports = BlogRouter