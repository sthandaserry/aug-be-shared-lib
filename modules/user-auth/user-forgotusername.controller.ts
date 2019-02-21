/**
 * @file forgotusername.controller.ts - send reset token for resetting their username
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 21/02/2019
 * lastModified: 21/02/2019
 */

import { Controller, Get, UseGuards, Body, Post, Res, HttpStatus, Patch, HttpException, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthService } from './user-auth.service';
import { UserCredential } from './interfaces/user-credential.interface';
import { wrapSuccess, wrapBadrequest, generateToken, wrapConflict, wrapError, randomNumeric } from '../../../aug-nest-tools';
@Controller('auth')
export class UserForgotusernameController {
  constructor(private readonly authService: UserAuthService, @Inject('MailerProvider') private readonly mailerProvider,
  ) { }
  @Patch('/forgotusername')
  async forgotPassword(@Body() body): Promise<any> {
    const resetToken = await randomNumeric();
    const user = await this.authService.forgotPassword(body.data, resetToken.toString());
    if (!user.statusCode) {
      this.mailerProvider.sendMail({
        to: user.email,
        from: process.env.FROM,
        subject: 'Biggest Buck reset username',
        html: '<b>Your reset code is: </b>' + user.token,
      });
      return wrapSuccess({ token: user.token }, 'Email send successfully.');
    } else {
      return wrapError(null, 'Email not found');
    }
  }
}
