const express = require('express')
const router = express.Router()

const {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook
} = require('../controllers/books')

router.route('/').get(getAllBooks).post(addBook)

router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook)

module.exports = router
