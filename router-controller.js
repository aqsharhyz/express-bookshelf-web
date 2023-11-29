const { nanoid } = require('nanoid')
const books = require('./books')

const addBookHandler = (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = req.body
  const id = nanoid(16)
  const finished = (pageCount === readPage)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  if (name === undefined) {
    return res
      .status(400)
      .json({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      })
  } else if (readPage > pageCount) {
    return res
      .status(400)
      .json({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      })
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }

  books.push(newBook)

  const isSuccess = books.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    return res
      .status(201)
      .json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id
        }
      })
  }
  res.status(500).json({
    status: 'fail',
    message: 'Gagal menambahkan buku'
  })
}

const getAllBooksHandler = (req, res) => {
  const { name = '', reading, finished } = req.query
  let result = [...books]

  if (name !== '') {
    result = result.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
  }

  if (reading !== undefined) {
    const x = parseInt(reading)
    if (x === 0) {
      result = result.filter((book) => book.reading === false)
    } else if (x === 1) {
      result = result.filter((book) => book.reading === true)
    }
  }

  if (finished !== undefined) {
    const y = parseInt(finished)
    if (y === 0) {
      result = result.filter((book) => book.finished === false)
    } else if (y === 1) {
      result = result.filter((book) => book.finished === true)
    }
  }

  res.status(200).json({
    status: 'success',
    data: {
      books: result.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  })
}

const getBookByIdHandler = (req, res) => {
  const { id } = req.params
  const book = books.filter((book) => book.id === id)[0]
  if (book !== undefined) {
    return res.status(200).json({
      status: 'success',
      data: {
        book
      }
    })
  }
  res.status(404).json({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
}

const editBookByIdHandler = (req, res) => {
  const { id } = req.params

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = req.body

  const updatedAt = new Date().toISOString()

  if (name === undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
  } else if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
  }

  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }
    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
  }
  res.status(404).json({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
}

const deleteBookByIdHandler = (req, res) => {
  const { id } = req.params
  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    books.splice(index, 1)
    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
  }
  res.status(404).json({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
}

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
}
