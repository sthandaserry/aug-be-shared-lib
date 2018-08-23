/**
 * @file resetpassword.controller.ts - Update new password.
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 19/07/2018
 * lastModified: 19/07/2018
 */

import { Controller, Get, UseGuards, Body, Post, Res, HttpStatus, Patch, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthService } from './user-auth.service';
import { UserCredential } from './interfaces/user-credential.interface';
import { wrapSuccess, wrapBadrequest, generateToken, wrapConflict, wrapError } from '../../../aug-nest-tools';

@Controller('auth')
export class UserResetpasswordController {
  constructor(private readonly authService: UserAuthService) { }
  @Patch('/resetpassword')
  async resetpassword(@Body() body): Promise<any> {
    const user = await this.authService.resetPassword(body);
    if (user) {
      return wrapSuccess(null, 'Password changed successfully.');
    }else{
      return wrapError(null, 'Token is invalid.');
    }
  }
}
