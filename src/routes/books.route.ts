import { BookController } from '@/controllers/books.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';
import { CreateBookDto } from '@/dtos/books.dto';

export class BookRoute implements Routes {
  public path = '/books';
  public router = Router();
  public book = new BookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}`).get(this.book.getBooks).post(AuthMiddleware, ValidationMiddleware(CreateBookDto), this.book.createBook);
    this.router.route(`${this.path}/me`).get(AuthMiddleware, this.book.getMyBooks);
    this.router
      .route(`${this.path}/:id`)
      .get(AuthMiddleware, this.book.getBookById)
      .put(AuthMiddleware, ValidationMiddleware(CreateBookDto, true), this.book.updateBook)
      .patch(AuthMiddleware, ValidationMiddleware(CreateBookDto, true), this.book.updateBook)
      .delete(AuthMiddleware, this.book.deleteBook);
  }
}
