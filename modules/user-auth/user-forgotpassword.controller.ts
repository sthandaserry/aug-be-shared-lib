/**
 * @file forgotpassword.controller.ts - send reset token for resetting their password
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 18/07/2018
 * lastModified: 18/07/2018
 */

import { Controller, Get, UseGuards, Body, Post, Res, HttpStatus, Patch, HttpException, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthService } from './user-auth.service';
import { UserCredential } from './interfaces/user-credential.interface';
import { wrapSuccess, wrapBadrequest, generateToken, wrapConflict, wrapError, randomNumeric } from '../../../aug-nest-tools';
@Controller('auth')
export class UserForgotpasswordController {
  constructor(private readonly authService: UserAuthService, @Inject('MailerProvider') private readonly mailerProvider,
  ) { }
  @Patch('/forgotpassword')
  async forgotPassword(@Body() body): Promise<any> {
    const resetToken = await randomNumeric();
    const user = await this.authService.forgotPassword(body.data, resetToken.toString());
    if (!user.statusCode) {
      this.mailerProvider.sendMail({
        to: user.email,
        from: process.env.FROM,
        subject: 'Biggest Buck reset password',
        html: '<b>Your reset code is: </b>' + user.token,
      });
      return wrapSuccess({ token: user.token }, 'Email send successfully.');
    } else {
      return wrapError(null, 'Email not found');
    }
  }
}
