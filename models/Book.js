const mongoose = require('mongoose')

// const {
//     name,
//     year,
//     author,
//     summary,
//     publisher,
//     pageCount,
//     readPage,
//     reading
//   } = req.body
//   const id = nanoid(16)
//   const finished = (pageCount === readPage)
//   const insertedAt = new Date().toISOString()
//   const updatedAt = insertedAt

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [200, 'Name cannot be more than 200 characters']
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [0, 'Year cannot be less than 0'],
      max: [new Date().getFullYear(), 'Year cannot be more than current year']
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      maxlength: [100, 'Author cannot be more than 100 characters']
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
      maxlength: [1000, 'Summary cannot be more than 1000 characters']
    },
    publisher: {
      type: String,
      required: [true, 'Publisher is required'],
      trim: true,
      maxlength: [100, 'Publisher cannot be more than 100 characters']
    },
    pageCount: {
      type: Number,
      required: [true, 'Page count is required'],
      min: [0, 'Page count cannot be less than 0']
    },
    readPage: {
      type: Number,
      required: [true, 'Read page is required'],
      min: [0, 'Read page cannot be less than 0'],
      max: this.pageCount
    },
    reading: {
      type: Boolean,
      required: [true, 'Reading status is required']
    },
    finished: {
      type: Boolean,
      required: true
    },
    // finished: {
    //   type: Boolean,
    //   required: [true, 'Finished status is required'],
    //   default: this.readPage === this.pageCount
    // }
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    }
  },
  {
    timestamps: true
  }
)

BookSchema.pre('save', async function () {
  this.finished = this.readPage === this.pageCount
})

module.exports = mongoose.model('Book', BookSchema)
