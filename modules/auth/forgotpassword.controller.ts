/**
 * @file forgotpassword.controller.ts - send reset token for resetting their password
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 18/07/2018
 * lastModified: 18/07/2018
 */

import { Controller, Get, UseGuards, Body, Post, Res, HttpStatus, Patch, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Credential } from './interfaces/credential.interface';
import { wrapSuccess, wrapBadrequest, generateToken, wrapConflict, wrapError } from '../../../aug-nest-tools';

@Controller('auth')
export class ForgotpasswordController {
  constructor(private readonly authService: AuthService) { }
  @Patch('/forgotpassword')
  async forgotPassword(@Body() body): Promise<any> {
    const resetToken = await generateToken(10);
    const admin = await this.authService.forgotPassword(body.email, resetToken);
    if (admin) {
      // TODO: Need to send email
      // Reset link should be http://domain.com/:resetToken/:id(userid)
      console.log('http://domain.com/' + resetToken + '/' + admin.id);
      return wrapSuccess({ token: admin.token }, 'Need to send email.');
    }
  }
}
