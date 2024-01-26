import { Service } from 'typedi';
import { Book } from '@/interfaces/books.interface';
import { BookModel } from '@/models/books.model';
import { User } from '@/interfaces/users.interface';
import { HttpException } from '@/exceptions/HttpException';

@Service()
export class BookService {
  public async findAllBook(user?: User): Promise<Book[]> {
    let books: Book[];
    if (user) {
      const queryObject = {
        createdBy: user._id,
      };
      books = await BookModel.find(queryObject);
      return books;
    }
    books = await BookModel.find();
    return books;
  }

  public async findBookById(user: User, bookId: string): Promise<Book> {
    const findBook: Book = await BookModel.findOne({ _id: bookId, createdBy: user._id });
    if (!findBook) throw new HttpException(409, "Book doesn't exist");

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
