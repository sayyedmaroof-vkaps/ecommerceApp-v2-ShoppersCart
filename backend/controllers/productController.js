import Product from '../models/Product.js'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

// @desc Add new product
// @route POST '/api/products/add'
// @access Private : Admin
export const addProduct = async (req, res) => {
  const date = new Date()
  try {
    if (!req.file) throw new Error('please upload an image')

    fs.access('uploads', err => {
      if (err) {
        fs.mkdirSync('/uploads')
      }
    })

    const product = new Product({
      ...req.body,
      image: `uploads/${date.getTime()}${req.file.originalname}`,
    })

    await sharp(req.file.buffer)
      .resize({ width: 400, height: 400 })
      .toFile(`uploads/${date.getTime()}${req.file.originalname}`)

    await product.save()
    res.status(201).json({ success: true, message: 'product added', product })
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(
        path.resolve(`uploads/${date.getTime()}${req.file.originalname}`)
      )
    }
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get All products
// @route GET '/api/products/getAll'
// @access Public
// Allowed queryparams : category, keyword, limit, skip
export const getAllProducts = async (req, res) => {
  try {
    let searchQuery = ''

    if (req.query.keyword) {
      searchQuery = String(req.query.keyword)
    }

    // for category filter
    if (req.query.category) {
      let categoryQuery = req.query.category
      const findQuery = {
        $and: [
          { category: categoryQuery },
          {
            $or: [
              { name: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } },
            ],
          },
        ],
      }
      const results = await Product.find(findQuery)

      const products = await Product.find(findQuery)
        .sort('-createdAt')
        .populate('category', 'title')
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))

      return res.json({ success: true, totalResults: results.length, products })
    }

    const findQuery = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ],
    }

    const results = await Product.find(findQuery)

    const products = await Product.find(findQuery)
      .sort('-createdAt')
      .populate('category', 'title')
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))

    return res.json({ success: true, totalResults: results.length, products })
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get One product
// @route GET '/api/products/:id'
// @access Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'category',
      'title'
    )
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found' })
    }
    res.json({ success: true, product })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Update product details
// @route PATCH '/api/products/:id'
// @access Private : Admin
export const updateProductDetails = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'sku', 'category', 'price', 'description']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ success: false, error: 'Invalid updates' })
  }

  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' })
  }

  updates.forEach(update => (product[update] = req.body[update]))
  try {
    await product.save()
    res.json({ success: true, message: 'Product Updated!', product })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Update prouduct image
// @route PATCH  '/api/products/:id/updateImage'
// @access Private : Admin
export const updateProductImage = async (req, res) => {
  const date = new Date()
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found' })
    }

    if (!req.file) throw new Error('please upload an image')
    fs.access('uploads', err => {
      if (err) {
        fs.mkdirSync('/uploads')
      }
    })
    fs.unlinkSync(path.resolve(product.image))

    await sharp(req.file.buffer)
      .resize({ width: 400, height: 400 })
      .toFile(`uploads/${date.getTime()}${req.file.originalname}`)

    product.image = `uploads/${date.getTime()}${req.file.originalname}`
    await product.save()
    res.json({ success: true, message: 'Image updated', image: product.image })
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(
        path.resolve(`uploads/${date.getTime()}${req.file.originalname}`)
      )
    }
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Delete a product
// @route DELETE  '/api/products/:id'
// @access Private : Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found' })
    }
    await product.remove()
    res.json({ success: true, message: 'product deleted' })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
