import { Service } from 'typedi';
import { Book } from '@/interfaces/books.interface';
import { BookModel } from '@/models/books.model';
import { User } from '@/interfaces/users.interface';
import { HttpException } from '@/exceptions/HttpException';
import { bookQuery } from '@/interfaces/bookQuery.interface';

@Service()
export class BookService {
  public async findAllBook(queryObject?: bookQuery, user?: User): Promise<Book[]> {
    user ? (queryObject.createdBy = user._id) : queryObject;
    const books: any[] = await BookModel.find(queryObject).populate('createdBy');

    const booksData: Book[] = books.map(book => {
      const bookData = book.toObject();
      bookData.createdBy = book.createdBy.name;
      return bookData;
    });

    return booksData;
  }

  public async findBookById(user: User, bookId: string): Promise<any> {
    let findBook: any = await BookModel.findOne({ _id: bookId, createdBy: user._id }).populate('createdBy');
    if (!findBook) throw new HttpException(409, "Book doesn't exist");

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
    const updateDataById = await BookModel.findByIdAndUpdate({ _id: bookId, createdBy: user._id }, { bookData }, { new: true, runValidators: true });
    if (!updateDataById) throw new HttpException(409, "Book doesn't exist");

    return updateDataById;
  }

  public async deleteBook(user: User, bookId: string): Promise<Book> {
    const deleteBookById: Book = await BookModel.findByIdAndDelete({ _id: bookId, createdBy: user._id });
    if (!deleteBookById) throw new HttpException(409, "Book doesn't exist");

    return deleteBookById;
  }
}
