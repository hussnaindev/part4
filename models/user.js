const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

mongoose.connect(config.MONGODB_URI).then(logger.info('mongoDB connected'))

const userSchema = new mongoose.Schema(
    {
        username: {type: String, minlength: 3, unique:true, required:true},
        passwordHash: {type: String},
        name: {type: String}
    }
)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })

module.exports = mongoose.model('User',userSchema)