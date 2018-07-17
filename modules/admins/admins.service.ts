/**
 * @file admins.service.ts - Admin business services
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 29/06/2018
 * lastModified: 29/06/2018
 */

import { Model, ValidationError } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Admin } from './interfaces/admin.interface';
import { Password } from './interfaces/password.interface';
import { Encrypter } from '../../utils';

@Injectable()
export class AdminsService {

  constructor(
    @Inject('AdminModelToken')
    private readonly adminModel: Model<Admin>,
  ) { }

  async create(admin: Admin): Promise<any> {
    try {
      // Password encrption
      const encrypter = new Encrypter();
      const salt = encrypter.createSalt();
      admin.salt = salt;
      admin.hpwd = encrypter.hashPwd(salt, admin.pwd as string);
      admin.pwd = undefined;

      const createdAdmin = new this.adminModel(admin);
      return await createdAdmin.save();
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }
  async update(admin: Admin, id): Promise<Admin> {
    try {
      delete admin.pwd;
      return await this.adminModel.findOneAndUpdate({ _id: id }, admin, { fields: { fname: 1, lname: 1 }, new: true }).exec();
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }

  async changePassword(password: Password, id): Promise<any> {
    try {
      const admin: Admin = await this.adminModel.findOne({ _id: id }).exec();
      if (admin) {
        const encrypter = new Encrypter();
        if (await encrypter.doesPasswordMatch(password.opwd, admin.hpwd, admin.salt)) {
          const salt = encrypter.createSalt();
          admin.salt = salt;
          admin.hpwd = encrypter.hashPwd(salt, password.pwd as string);
          return await this.adminModel.findOneAndUpdate({ _id: id }, admin).exec();
        } else {
          return false;
        }
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }

  async findAll(): Promise<Admin[]> {
    return await this.adminModel.find().exec();
  }

  async find(whereColumn): Promise<Admin[]> {
    return await this.adminModel.find(whereColumn).exec();
  }

  async findOne(whereColumn) {
    return await this.adminModel.findOne(whereColumn);
  }
}