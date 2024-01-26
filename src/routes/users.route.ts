import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AdminMiddleware } from '@/middlewares/admin.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}`).get(AuthMiddleware, AdminMiddleware, this.user.getUsers);
    this.router.route(`${this.path}/me`).get(AuthMiddleware, this.user.getMe);
    this.router
      .route(`${this.path}/:id`)
      .get(AuthMiddleware, this.user.getUserById)
      .put(AuthMiddleware, ValidationMiddleware(CreateUserDto, true), this.user.updateUser)
      .patch(AuthMiddleware, ValidationMiddleware(CreateUserDto, true), this.user.updateUser)
      .delete(AuthMiddleware, this.user.deleteUser);
  }
}
