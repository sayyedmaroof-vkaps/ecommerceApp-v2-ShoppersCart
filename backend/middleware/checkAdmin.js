const checkAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next()
    } else {
      throw new Error()
    }
  } catch (err) {
    res
      .status(401)
      .json({ success: false, error: 'Not authorized as an admin!' })
  }
}

export default checkAdmin
