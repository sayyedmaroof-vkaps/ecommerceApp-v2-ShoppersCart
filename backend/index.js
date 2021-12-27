import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('This is the home page!')
})

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
)
