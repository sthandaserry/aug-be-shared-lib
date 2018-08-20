/**
 * @file registration.controller.ts - registring user
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 18/07/2018
 * lastModified: 18/07/2018
 */

import { Controller, Get, UseGuards, Body, Post, Res, HttpStatus, Patch, HttpException, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthService } from './user-auth.service';
import { UserCredential } from './interfaces/user-credential.interface';
import { User } from '../users/interfaces/user.interface';
import { wrapSuccess, wrapBadrequest, generateToken, wrapConflict, wrapError } from '../../../aug-nest-tools';

@Controller('/auth')
export class RegistrationController {
  constructor(private readonly authService: UserAuthService) { }
  @Post('/register')
  async register(@Body() user: User, @Res() res): Promise<any> {
    const userExist: User[] = await this.authService.find({ $or: [{ email: user.email }, { uname: user.uname }] });
    if (userExist.length === 0) {
      const result = await this.authService.register(user);
      if (result) {
        res.status(HttpStatus.CREATED).json(wrapSuccess(result, 'Created Successfully.'));
      } else {
        res.status(HttpStatus.BAD_REQUEST).json(result);
      }
    } else {
      res.status(HttpStatus.OK).json(wrapConflict('User already exist!'));
    }
  }
}
