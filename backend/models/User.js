import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      minLength: [3, 'Please enter a name with atleast 3 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Please enter a valid email')
        }
      },
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [6, 'Password must be at least 6 characters long!'],
      trim: true,
      validate(pass) {
        if (pass.toLowerCase().includes('password')) {
          throw new Error(
            'The password should not includes the word password itself!'
          )
        }
      },
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
)

// Defining function for hiding private data of users
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.__v

  return userObject
}

// generating authentication token and saving to the database
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
  await user.save()
  return token
}

// Logging in user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Invalid Email or Password!')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid Email or Password!')
  }
  return user
}

// hashing password before saving the user
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
  next()
})

// Middleware function for unique email error
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email already taken!'))
  } else {
    next()
  }
})

// deleting the user notes when the user profile deletion
// userSchema.pre('remove', async function (next) {
//   await Note.deleteMany({ user: this._id })
//   next()
// })

// creating mongoose model for User collection
const User = mongoose.model('User', userSchema)

export default User
