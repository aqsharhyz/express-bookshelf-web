const express = require('express')
const app = express()
const port = 9000

const book = require('./router-book')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/books', book)

app.listen(port, () => console.log(`Server running on port ${port}`))
