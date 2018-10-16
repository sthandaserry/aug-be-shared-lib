/**
 * @file users.service.ts - User business services
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 23/07/2018
 * lastModified: 23/07/2018
 */

import { Model, ValidationError } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserPassword } from './interfaces/user-password.interface';
import { Encrypter } from '../../utils';
import { PaginationOptions } from '../../decorators/pagination.decorator';

@Injectable()
export class UsersService {

  constructor(
    @Inject('UserModelToken')
    private readonly userModel: Model<User>,
  ) { }

  async update(user: User, id): Promise<User> {
    try {
      delete user.pwd;
      return await this.userModel.findOneAndUpdate({ _id: id }, user, { fields: { fname: 1, lname: 1 }, new: true }).exec();
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }

  async changePassword(password: UserPassword, id): Promise<any> {
    try {
      const user: User = await this.userModel.findOne({ _id: id }).exec();
      if (user) {
        const encrypter = new Encrypter();
        if (await encrypter.doesPasswordMatch(password.opwd, user.hpwd, user.salt)) {
          const salt = encrypter.createSalt();
          user.salt = salt;
          user.hpwd = encrypter.hashPwd(salt, password.pwd as string);
          return await this.userModel.findOneAndUpdate({ _id: id }, user).exec();
        } else {
          return false;
        }
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }

  async findOne(whereColumn) {
    try {
      return await this.userModel.findOne(whereColumn).populate('profile.cId', 'name').populate('profile.sId', 'name');
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(pagination?: PaginationOptions): Promise<User[]> {
    try {
      return await this.userModel.find().limit(pagination.limit).skip(pagination.skip).exec();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}