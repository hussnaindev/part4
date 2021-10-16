const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(logger.info("mongoDB connected"))

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  module.exports = mongoose.model('Blog',blogSchema)