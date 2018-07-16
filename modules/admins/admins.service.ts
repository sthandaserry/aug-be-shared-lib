/**
 * @file admins.service.ts - Admin business services
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 29/06/2018
 * lastModified: 29/06/2018
 */

import { Model, ValidationError } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus, Next } from '@nestjs/common';
import { Admin } from './interfaces/admin.interface';
import { Encrypter } from '../../utils';

@Injectable()
export class AdminsService {

  constructor(
    @Inject('AdminModelToken')
    private readonly adminModel: Model<Admin>,
  ) { }

  async create(admin: Admin): Promise<Admin> {
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