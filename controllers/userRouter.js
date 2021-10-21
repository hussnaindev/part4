const express = require('express')
const UserRouter = express.Router()
const User = require('../models/user')
const cors = require('cors')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')

UserRouter.use(express.json())
UserRouter.use(cors())

UserRouter.post('/', async (request,response) => 
{
    logger.info(request.body)

    const magic = 10
    const passwordHash = await bcrypt.hash(request.body.password, magic)

    const user = new User({
        username: request.body.username,
        name: request.body.name,
        passwordHash
    })

    try{
        await user.save()
        response.status(201).json(user)

    }
      
    catch(error){
        logger.error(error.message)
    }
    
})

UserRouter.get('/', async (request,response) => 
{
    logger.info(request.body)

    try{
        const users = await User.find({})
        response.status(200).json(users)
    }
      
    catch(error){
        logger.error(error.message)
    }
    
})

module.exports = UserRouter 