/**
 * @file resetpassword.controller.ts - Update new password.
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 19/07/2018
 * lastModified: 19/07/2018
 */

import { Controller, Get, UseGuards, Body, Post, Res, HttpStatus, Patch, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Credential } from './interfaces/credential.interface';
import { wrapSuccess, wrapBadrequest, generateToken, wrapConflict, wrapError } from '../../../aug-nest-tools';

@Controller('auth')
export class ResetpasswordController {
  constructor(private readonly authService: AuthService) { }
  @Patch('/resetpassword')
  async resetpassword(@Body() body, @Res() res): Promise<any> {
    const admin = await this.authService.resetPassword(body);
    if (admin) {
      return res.status(HttpStatus.OK).json(wrapSuccess(null, 'Password changed successfully.'));
    }else{
      return res.status(HttpStatus.BAD_REQUEST).json(wrapError(null, 'Token is invalid.'));
    }
  }
}
