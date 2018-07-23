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

@Injectable()
export class UsersService {

  constructor(
    @Inject('UserModelToken')
    private readonly userModel: Model<User>,
  ) { }

  async create(user: User): Promise<any> {
    try {
      // Password encrption
      const encrypter = new Encrypter();
      const salt = encrypter.createSalt();
      user.salt = salt;
      user.hpwd = encrypter.hashPwd(salt, user.pwd as string);
      user.pwd = undefined;

      const createdUser = new this.userModel(user);
      return await createdUser.save();
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }
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

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async find(whereColumn): Promise<User[]> {
    return await this.userModel.find(whereColumn).exec();
  }

  async findOne(whereColumn) {
    return await this.userModel.findOne(whereColumn);
  }
}