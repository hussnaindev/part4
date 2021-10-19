const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(logger.info("mongoDB connected"))

const blogSchema = new mongoose.Schema({
    title: {type:String, default: ''},
    author: {type:String},
    url: {type:String, default: ''},
    likes: {type: Number, default: 0}
  })

  module.exports = mongoose.model('Blog',blogSchema)