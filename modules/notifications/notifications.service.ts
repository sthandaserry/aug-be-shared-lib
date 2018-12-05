/**
 * @file notifications.service.ts - Notification business services
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 29/06/2018
 * lastModified: 29/06/2018
 */

import { Model, ValidationError } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Notification } from './interfaces/notification.interface';
import { Encrypter } from '../../utils';
import { PaginationOptions } from '../../decorators/pagination.decorator';

@Injectable()
export class NotificationsService {

  constructor(
    @Inject('NotificationModelToken')
    private readonly notificationModel: Model<Notification>,
  ) { }

  async create(notification): Promise<Notification> {
    try {

      const createdNotification =  new this.notificationModel(notification);
      return await createdNotification.save();
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }
  async update(notification: Notification, id): Promise<Notification> {
    try {
      return await this.notificationModel.findOneAndUpdate({ _id: id }, notification, { new: true }).exec();
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }

  async findAll(pagination?: PaginationOptions): Promise<Notification[]> {
    try {
      return await this.notificationModel.find().limit(pagination.limit).skip(pagination.skip).exec();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(whereColumn): Promise<Notification[]> {
    return await this.notificationModel.find(whereColumn).exec();
  }

  async findOne(whereColumn) {
    return await this.notificationModel.findOne(whereColumn);
  }
}