/**
 * @file admins.module.ts - Entry points for admins module
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 29/06/2018
 * lastModified: 29/06/2018
 */

import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { adminsProviders } from './admins.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminsController],
  providers: [AdminsService, ...adminsProviders],
})
export class AdminsModule {}