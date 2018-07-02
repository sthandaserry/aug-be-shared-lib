/**
 * @file admin/app.module.ts - main application module for admin
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 29/06/2018
 * lastModified: 29/06/2018
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsModule } from './admins/admins.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB),
    AdminsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
