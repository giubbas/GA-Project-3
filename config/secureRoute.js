import jwt from 'jsonwebtoken'
import User from '../models/users.js'
import 'dotenv/config'
export const secureRoute = async (req, res, next) => {
  try {

    if (!req.headers.authorization) throw new Error('Missing header')
    const token = req.headers.authorization.replace('Bearer ', '')

    const payload = jwt.verify(token, process.env.SECRET)

    const userToVerify = await User.findById(payload.sub)
    if (!userToVerify) throw new Error('User not found')
    req.verifiedUser = userToVerify
    next()
    
  } catch (error) {

    console.log(error)
    return res.status(401).json({ message: 'Unauthorised' })
    
  }


}