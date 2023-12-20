require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
// const rateLimiter

// Swagger

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth')
const bookRouter = require('./routes/books')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
// app.use(express.urlencoded({ extended: true }))

// routes
app.use('/auth', authRouter)
app.use('/books', authenticateUser, bookRouter)

// error handler
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 9000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server running on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
