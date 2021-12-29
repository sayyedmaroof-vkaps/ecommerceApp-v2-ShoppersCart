import User from '../models/User.js'

// @desc Register a new user
// @route POST '/api/users/register'
// @access Public
export const registerUser = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ success: true, user, token })
  } catch (e) {
    res.status(400).json({ success: false, error: e.message })
  }
}

// @desc Login user
// @route POST '/api/users/login'
// @access Public
export const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).json({ success: true, user, token })
  } catch (e) {
    res.status(400).json({ success: false, error: e.message })
  }
}

// @desc Read user profile
// @route GET '/api/users/profile'
// @access Private: User
export const readProfile = (req, res) => {
  res.json(req.user)
}

// @desc Update user profile
// @route PATCH '/api/users/profile'
// @access Private : user
export const updateProfile = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' })
  }

  updates.forEach(update => (req.user[update] = req.body[update]))
  try {
    await req.user.save()
    res.json({ success: true, message: 'profile updated', user: req.user })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

// @desc Delete user profile
// @route DELETE '/api/users/profile'
// @access Private: user
export const deleteProfile = async (req, res) => {
  try {
    await req.user.remove()
    res.json({ success: true, message: 'user deleted' })
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
}

// @desc Get all users
// @route DELETE '/api/users/profile'
// @access Private: Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).sort('-createdAt')
    res.json({ success: true, users })
  } catch (err) {
    res.status(500).json({ success: false, error: e.message })
  }
}
