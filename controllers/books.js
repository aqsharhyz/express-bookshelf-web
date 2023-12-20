const { StatusCodes } = require('http-status-codes')
const Book = require('../models/Book')
const { NotFoundError, BadRequestError } = require('../errors')

const addBook = async (req, res) => {
  req.body.createdBy = req.user.userId
  const book = await Book.create(req.body)
  res.status(StatusCodes.CREATED).json({ book })
}

const getAllBooks = async (req, res) => {
  const { name, author, publisher, reading, finished, sort, fields, numericFilters } = req.query
  const queryObject = { createdBy: req.user.userId }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  if (author) {
    queryObject.author = { $regex: author, $options: 'i' }
  }
  if (publisher) {
    queryObject.publisher = publisher
  }
  if (reading) {
    queryObject.reading = reading === '1'
  }
  if (finished) {
    queryObject.finished = finished === '1'
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte'
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    const options = ['pageCount', 'readPage', 'year']
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }
  const result = await Book.find(queryObject)

  if (sort) {
    const sortList = sort.split(',').join(' ')
    result.sort(sortList)
  } else {
    result.sort('createdAt')
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result.select(fieldsList)
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result.skip(skip).limit(limit)

  const books = await result
  res.status(StatusCodes.OK).json({ books })
}

const getBook = async (req, res) => {
  const { user: { userId }, params: { id: bookId } } = req

  const book = await Book.findOne({ _id: bookId, createdBy: userId })
  if (!book) {
    throw new NotFoundError(`No book with id ${bookId}`)
  }
  res.status(StatusCodes.Ok).json({ book })
}

const deleteBook = async (req, res) => {
  const { user: { userId }, params: { id: bookId } } = req

  const job = await Book.findByIdAndRemove({
    _id: bookId,
    createdBy: userId
  })
  if (!job) {
    throw new NotFoundError(`No book with id ${bookId}`)
  }
  res.status(StatusCodes.Ok).send()
}

const updateBook = async (req, res) => {
  const {
    body: { author, publisher },
    user: { userId },
    params: { id: bookId }
  } = req

  // if (company === '' || position === '') {
  //   throw new BadRequestError('Company or Position fields cannot be empty')
  // }
  if (author === '' || publisher === '') {
    throw new BadRequestError('Author or Publisher fields cannot be empty')
  }
  // const job = await Job.findByIdAndUpdate(
  //   { _id: jobId, createdBy: userId },
  //   req.body,
  //   { new: true, runValidators: true }
  // )
  // if (!job) {
  //   throw new NotFoundError(`No job with id ${jobId}`)
  // }
  const book = await Book.findByIdAndUpdate(
    { _id: bookId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!book) {
    throw new NotFoundError(`No book with id ${bookId}`)
  }
  res.status(StatusCodes.OK).json({ book })
}

module.exports = {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook
}
