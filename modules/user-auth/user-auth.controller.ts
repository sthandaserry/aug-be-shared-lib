/**
 * @file auth.controller.ts - Authenticate user details
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 23/07/2018
 * lastModified: 23/07/2018
 */

import { Controller, Get, UseGuards, Body, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthService } from './user-auth.service';
import { UserCredential } from './interfaces/user-credential.interface';
import { wrapSuccess, wrapBadrequest } from '../../../aug-nest-tools';

@Controller('/auth')
export class UserAuthController {
  constructor(private readonly authService: UserAuthService) { }

  @Post('/login')
  async login(@Body() credential: UserCredential, @Res() res): Promise<any> {
    const result = await this.authService.authenticate(credential);
    if (result) {
      res.status(HttpStatus.OK).json(wrapSuccess(result, 'Authenticated Successfully.'));
    } else {
      res.status(HttpStatus.OK).json(wrapBadrequest('Invalid Credentials.'));
    }
  }
}
