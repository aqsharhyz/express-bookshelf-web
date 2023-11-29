const express = require('express')
const router = express.Router()

const {
  getAllBooksHandler,
  getBookByIdHandler,
  addBookHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
} = require('./router-controller')

router.route('/').get(getAllBooksHandler).post(addBookHandler)
router.route('/:id').get(getBookByIdHandler).put(editBookByIdHandler).delete(deleteBookByIdHandler)

module.exports = router
