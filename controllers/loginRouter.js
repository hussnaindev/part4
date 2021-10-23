const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express= require('express')
const loginRouter = express.Router()
const cors = require('cors')
const User = require('../models/user')
const logger = require('../utils/logger')

loginRouter.use(express.json())
loginRouter.use(cors())

loginRouter.post('/', async (request, response) => {
  const body = request.body
  logger.info(body)

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*30})

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter