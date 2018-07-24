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
import { wrapSuccess, wrapBadrequest, generateToken, wrapConflict, wrapError } from '../../../aug-nest-tools';
@Controller('auth')
export class UserForgotpasswordController {
  constructor(private readonly authService: UserAuthService, @Inject('MailerProvider') private readonly mailerProvider,
  ) { }
  @Patch('/forgotpassword')
  async forgotPassword(@Body() body): Promise<any> {
    const resetToken = await generateToken(10);
    const admin = await this.authService.forgotPassword(body.email, resetToken);
    if (admin) {
      this.mailerProvider.sendMail({
        to: 'kaalee6@gmail.com',
        from: process.env.FROM,
        subject: 'Biggest Buck reset password',
        html: '<b>Your reset code is: </b>' + admin.token,
      });
      return wrapSuccess({ token: admin.token }, 'Email send successfully.');
    } else {
      return wrapError(null, 'Email not found');
    }
  }
}
