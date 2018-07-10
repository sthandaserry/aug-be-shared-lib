/**
 * @file admins.service.ts - Admin business services
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 29/06/2018
 * lastModified: 29/06/2018
 */

import { Model, ValidationError } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IAdmin } from './interfaces/admin.interface';

@Injectable()
export class AdminsService {

  constructor(
    @Inject('AdminModelToken')
    private readonly adminModel: Model<IAdmin>,
  ) { }

  async create(admin: IAdmin): Promise<IAdmin> {
    try {
      const createdAdmin = new this.adminModel(admin);
      return await createdAdmin.save();
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }
  async findAll(): Promise<IAdmin[]> {
    return await this.adminModel.find().exec();
  }
}