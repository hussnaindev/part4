const express = require('express')
require('express-async-errors')
const BlogRouter = express.Router()
const Blog = require('../models/blog.js')
const cors = require('cors')
const logger = require('../utils/logger')
const errorHandler = require('../utils/errorHandler')
const User = require('../models/user.js')

BlogRouter.use(express.json())
BlogRouter.use(cors())

BlogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
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

    if(request.body.url==='' || request.body.title==='')
    {
      response.status(400).end()
    }
    else
    {
          const user = await User.findById(request.body.userId)
          logger.info(user)

          const blog = new Blog({
          url: request.body.url,
          title: request.body.title,
          author: request.body.author,
          likes: request.body.likes,
          user: user.id
        })

  
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        response.status(201).json(savedBlog)
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

  BlogRouter.put('/:id', async (request, response) => {

    const updateBlog = {
       title: request.body.title,
       author: request.body.author,
       url: request.body.url,
       likes: request.body.likes
    }

    const foundAndUpdated = await Blog.findByIdAndUpdate(request.params.id, updateBlog )
    if(foundAndUpdated)
    {
      response.json(foundAndUpdated)
    }
    else
    {
      response.status(400).json({error: "blog not found"})
    }
    
  })

  BlogRouter.use(errorHandler.unknownEndpoint)
  BlogRouter.use(errorHandler.errorHandler)

module.exports = BlogRouter