import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter title!'],
      minLength: [3, 'Title must be atleast 3 characters long'],
      trim: true,
    },
    image: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)

export default Category
