/**
 * @file notifications.module.ts - Entry points for notifications module
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 30/11/2018
 * lastModified: 30/11/2018
 */

import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { notificationsProviders } from './notifications.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, ...notificationsProviders],
  exports: [NotificationsService],
})
export class NotificationsModule {}