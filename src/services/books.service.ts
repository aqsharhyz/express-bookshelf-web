import { Service } from 'typedi';
import { Book } from '@/interfaces/books.interface';
import { BookModel } from '@/models/books.model';
import { User } from '@/interfaces/users.interface';
import { HttpException } from '@/exceptions/HttpException';
import { bookQuery } from '@/interfaces/query/bookQuery.interface';
import { queryOption } from '@/interfaces/query/queryOption.interface';

@Service()
export class BookService {
  public async findAllBook(queryObject?: bookQuery, user?: User, queryOptions?: queryOption): Promise<Book[]> {
    user ? (queryObject.createdBy = user._id) : queryObject;
    if (queryOptions.sort) {
      const sortBy = queryOptions.sort.toString().split(',').join(' ');
      queryOptions.sort = sortBy;
    } else {
      queryOptions.sort = '-createdAt';
    }

    if (queryOptions.fields) {
      const selectFields = queryOptions.fields.toString().split(',').join(' ');
      queryOptions.fields = selectFields;
    }

    const page = parseInt(queryOptions.page) || 1;
    const limit = parseInt(queryOptions.limit) || 10;
    const skip = (page - 1) * limit;

    const books: any[] = await BookModel.find(queryObject, queryOptions.fields).sort(queryOptions.sort).skip(skip).limit(limit).populate('createdBy');

    const booksData: Book[] = books.map(book => {
      const bookData = book.toObject();
      bookData.createdBy = book.createdBy.name;
      return bookData;
    });

    return booksData;
  }

  public async findBookById(user: User, bookId: string): Promise<Book> {
    let findBook: any = await BookModel.findOne({ _id: bookId }).populate('createdBy');
    if (!findBook) throw new HttpException(409, "Book doesn't exist");
    if (findBook.createdBy._id.toString() !== user._id && user.role !== 'admin') throw new HttpException(409, "You're not book owner");

    const findBookData = findBook.toObject();
    findBookData.createdBy = findBook.createdBy.name;
    findBook = findBookData;

    return findBook;
  }

  public async createBook(bookData: Book): Promise<Book> {
    const createBookData: Book = await BookModel.create({ ...bookData });

    return createBookData;
  }

  public async updateBook(user: User, bookId: string, bookData: Book): Promise<Book> {
    const bookToUpdate = await BookModel.findById({ _id: bookId });
    if (!bookToUpdate) throw new HttpException(409, "Book doesn't exist");
    if (bookToUpdate.createdBy.toString() !== user._id && user.role !== 'admin') throw new HttpException(409, "You're not book owner");

    const updateDataById = await BookModel.findByIdAndUpdate({ _id: bookId }, { ...bookData }, { new: true, runValidators: true });

    return updateDataById;
  }

  public async deleteBook(user: User, bookId: string): Promise<Book> {
    const bookToDelete = await BookModel.findById({ _id: bookId });
    if (!bookToDelete) throw new HttpException(409, "Book doesn't exist");
    if (bookToDelete.createdBy.toString() !== user._id && user.role !== 'admin') throw new HttpException(409, "You're not book owner");

    const deleteBookById = await BookModel.findByIdAndDelete({ _id: bookId });

    return deleteBookById;
  }
}
