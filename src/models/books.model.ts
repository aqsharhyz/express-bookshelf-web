import { Book } from '@/interfaces/books.interface';
import { Document, Schema, model } from 'mongoose';

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
      minlength: [3, 'Title cannot be less than 3 characters'],
    },
    year: {
      type: Number,
      required: [true, 'Please enter a year'],
      min: [0, 'Year cannot be less than 0'],
      max: [new Date().getFullYear(), `Year cannot be more than ${new Date().getFullYear()}`],
    },
    author: {
      type: String,
      required: [true, 'Please enter an author'],
      trim: true,
      maxlength: [100, 'Author cannot be more than 100 characters'],
      minlength: [3, 'Author cannot be less than 3 characters'],
    },
    summary: {
      type: String,
      required: [true, 'Please enter a summary'],
      trim: true,
      maxlength: [1000, 'Summary cannot be more than 1000 characters'],
    },
    publisher: {
      type: String,
      required: [true, 'Please enter a publisher'],
      trim: true,
      maxlength: [100, 'Publisher cannot be more than 100 characters'],
    },
    pageCount: {
      type: Number,
      required: [true, 'Please enter a page count'],
      min: [0, 'Page count cannot be less than 0'],
    },
    readPage: {
      type: Number,
      required: [true, 'Please enter a read page'],
      min: [0, 'Read page cannot be less than 0'],
    },
    reading: {
      type: Boolean,
      required: [true, 'Please enter a reading status'],
    },
    finished: {
      type: Boolean,
      default: false,
    },
    // category: {
    //   type: String,
    //   trim: true,
    //   default: 'Other',
    // },
    // rating: {
    //   type: Number,
    //   default: 0,
    //   min: [0, 'Rating cannot be less than 0'],
    //   max: [5, 'Rating cannot be more than 5'],
    // },
    // tags: {
    //   type: [String],
    //   trim: true,
    //   default: [],
    // },
    // access: {
    //   type: String,
    //   enum: ['public', 'private'],
    //   default: 'public',
    // },
    // isbn: {
    //   type: String,
    //   trim: true,
    //   maxlength: [20, 'ISBN cannot be more than 20 characters'],
    // },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter a user'],
    },
  },
  { timestamps: true },
);

BookSchema.pre('save', function () {
  this.finished !== undefined ? this.finished : (this.finished = this.readPage === this.pageCount);
});

BookSchema.pre('save', function () {
  this.readPage > this.pageCount ? (this.readPage = this.pageCount) : this.readPage;
});

// BookSchema.index({ title: 1, createdBy: 1 }, { unique: true });

export const BookModel = model<Book & Document>('Book', BookSchema);
