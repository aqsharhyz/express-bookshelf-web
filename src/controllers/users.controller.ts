import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { HttpException } from '@/exceptions/HttpException';
import { userQuery } from '@/interfaces/query/userQuery.interfaces';

export class UserController {
  public user = Container.get(UserService);

  filteringUsers = async (req: RequestWithUser): Promise<userQuery> => {
    const { name, email, role } = req.query;
    const queryObject: userQuery = {};
    if (name) queryObject.name = { $regex: name, $options: 'i' };
    if (email) queryObject.email = { $regex: email, $options: 'i' };
    if (role && role !== 'all') queryObject.role = role;

    return queryObject;
  };

  public getMe = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;

      res.status(200).json({ data: userData, message: 'me' });
    } catch (error) {
      next(error);
    }
  };

  public getUsers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const queryObject = await this.filteringUsers(req);
      const findAllUsersData: User[] = await this.user.findAllUser(queryObject);

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;

      if (userId.toString() !== req.user._id.toString() && req.user.role.toString() !== 'admin') {
        throw new HttpException(401, 'You are not allowed to get other user data');
      }

      const findOneUserData: User = await this.user.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: User = req.body;

      if (userId.toString() !== req.user._id.toString() && req.user.role.toString() !== 'admin') {
        throw new HttpException(401, 'You are not allowed to update other user data');
      }

      if (userData.role && req.user.role.toString() !== 'admin') {
        throw new HttpException(401, 'You are not allowed to update role');
      }

      const updateUserData: User = await this.user.updateUser(userId, userData);

      updateUserData.password = '';

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const user: User = req.user;

      if (userId.toString() !== user._id.toString() && user.role.toString() !== 'admin') {
        throw new HttpException(401, 'You are not allowed to delete other user data');
      }

      const deleteUserData: User = await this.user.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
