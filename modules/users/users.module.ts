/**
 * @file users.module.ts - Entry points for users module
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 23/07/2018
 * lastModified: 23/07/2018
 */

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}