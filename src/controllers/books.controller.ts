import { operatorMapNumericFilters, regExNumericFilters } from '@/config';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { bookQuery } from '@/interfaces/query/bookQuery.interface';
import { queryOption } from '@/interfaces/query/queryOption.interface';
import { BookService } from '@/services/books.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class BookController {
  public book = Container.get(BookService);

  filteringBooks = async (req: RequestWithUser | Request): Promise<bookQuery> => {
    const { title, author, publisher, reading, finished, numericFilters } = req.query;
    // createdBy
    const queryObject: bookQuery = {};
    if (title) queryObject.title = { $regex: title, $options: 'i' };
    if (author) queryObject.author = { $regex: author, $options: 'i' };
    if (publisher) queryObject.publisher = { $regex: publisher, $options: 'i' };
    if (reading && reading !== 'all') queryObject.reading = reading;
    if (finished && finished !== 'all') queryObject.finished = finished;

    if (numericFilters) {
      const filters: string = numericFilters.toString().replace(regExNumericFilters, match => `-${operatorMapNumericFilters[match]}-`);
      const options = ['year', 'readPage', 'pageCount'];
      filters.split(',').forEach(item => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field) && operator && value) queryObject[field] = { [operator]: Number(value) };
      });
    }

    return queryObject;
  };

  public getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryOptions: { sort?; fields?; page?; limit?; skip? } = req.query;
      const queryObject = await this.filteringBooks(req);
      const findAllBooksData = await this.book.findAllBook(queryObject, null, queryOptions);

      res.status(200).json({ data: findAllBooksData, total: findAllBooksData.length, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMyBooks = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const queryOptions: queryOption = req.query;
      const user = req.user;
      const queryObject = await this.filteringBooks(req);
      const findAllBooksData = await this.book.findAllBook(queryObject, user, queryOptions);

      res.status(200).json({ data: findAllBooksData, total: findAllBooksData.length, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBookById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const bookId: string = req.params.id;
      const findOneBookData = await this.book.findBookById(user, bookId);

      res.status(200).json({ data: findOneBookData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      req.user.role == 'admin' ? (req.body.createdBy ? req.body.createdBy : req.user._id) : (req.body.createdBy = req.user._id);

      const bookData = req.body;
      const createBookData = await this.book.createBook(bookData);

      res.status(201).json({ data: createBookData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBook = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const bookId: string = req.params.id;
      const bookData = req.body;
      const updateBookData = await this.book.updateBook(user, bookId, bookData);

      res.status(200).json({ data: updateBookData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBook = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const bookId: string = req.params.id;
      const deleteBookData = await this.book.deleteBook(user, bookId);

      res.status(200).json({ data: deleteBookData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
