/**
 * @file admins.service.ts - Admin business services
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 29/06/2018
 * lastModified: 29/06/2018
 */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './interfaces/admin.interface';

@Injectable()
export class AdminsService {
  constructor(@InjectModel('Admin') private readonly adminModel: Model<Admin>) {}

  async create(admin: Admin): Promise<Admin> {
    const createdAdmin = new this.adminModel(admin);
    return await createdAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminModel.find().exec();
  }
}