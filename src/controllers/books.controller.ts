import { RequestWithUser } from '@/interfaces/auth.interface';
import { BookService } from '@/services/books.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class BookController {
  public book = Container.get(BookService);

  // filteringBooks = async (req: RequestWithUser | Request, next: NextFunction) => {
  //   const { name, reading, finished } = req.query;
  //   const user = req.user;
  //   const findAllBooksData = await this.book.findAllBook(user);
  //   let filteredBooks = findAllBooksData;

  //   if (name) {
  //     filteredBooks = filteredBooks.filter(book => {
  //       const bookName: string = book.title.toLowerCase();
  //       return bookName.includes(name.toString().toLowerCase());
  //     });
  //   }

  //   if (reading) {
  //     filteredBooks = filteredBooks.filter(book => book.reading === (reading === '1'));
  //   }

  //   if (finished) {
  //     filteredBooks = filteredBooks.filter(book => book.finished === (finished === '1'));
  //   }

  //   return filteredBooks;
  // };

  // public getBooks = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const findAllBooksData = await this.book.findAllBook();

  //     res.status(200).json({ data: findAllBooksData, message: 'findAll' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public getMyBooks = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const findAllBooksData = await this.book.findAllBook(user);

      res.status(200).json({ data: findAllBooksData, message: 'findAll' });
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
      req.body.createdBy = req.user._id;
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
