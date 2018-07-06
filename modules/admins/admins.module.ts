/**
 * @file admins.module.ts - Entry points for admins module
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 29/06/2018
 * lastModified: 29/06/2018
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminSchema } from '../../../schemas/admin.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }])],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}