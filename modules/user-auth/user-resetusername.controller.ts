/**
 * @file resetusername.controller.ts - Update new username.
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 21/02/2018
 * lastModified: 21/02/2018
 */

import { Controller, Get, UseGuards, Body, Post, Res, HttpStatus, Patch, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthService } from './user-auth.service';
import { UserCredential } from './interfaces/user-credential.interface';
import { wrapSuccess, wrapBadrequest, generateToken, wrapConflict, wrapError } from '../../../aug-nest-tools';
import { User } from '../users/interfaces/user.interface';

@Controller('auth')
export class UserResetusernameController {
  constructor(private readonly authService: UserAuthService) { }
  @Patch('/resetusername')
  async resetusername(@Body() body): Promise<any> {
    const userExist: User[] = await this.authService.find({ uname: { $regex: body.uname, $options: '$i' } });
    if (userExist.length === 0) {
      const user = await this.authService.resetUsername(body);
      if (user) {
        return wrapSuccess(null, 'Username changed successfully.');
      } else {
        return wrapError(null, 'Token is invalid.');
      }
    } else {
      return wrapConflict('User already exist!');
    }

  }
}
