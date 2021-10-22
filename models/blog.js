const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(logger.info("mongoDB connected"))

const blogSchema = new mongoose.Schema({
    title: {type:String, default: ''},
    author: {type:String},
    url: {type:String, default: ''},
    likes: {type: Number, default: 0},
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Blog',blogSchema)