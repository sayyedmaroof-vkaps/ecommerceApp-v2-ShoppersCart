import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id)
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (e) {
    res.status(401).json({ success: false, error: 'Please authenticate!' })
  }
}

export default auth
