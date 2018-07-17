/**
 * @file auth.controller.ts - Authenticate admin user details
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 16/07/2018
 * lastModified: 16/07/2018
 */

import { Controller, Get, UseGuards, Body, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Credential } from './interfaces/credential.interface';
import { wrapSuccess, wrapBadrequest } from '../..';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() credential: Credential, @Res() res): Promise<any> {
    const result = await this.authService.authenticate(credential);
    if (result) {
      res.status(HttpStatus.OK).json(wrapSuccess(result, 'Authunticated Successfully.'));
      return result;
    } else {
      res.status(HttpStatus.BAD_REQUEST).json(wrapBadrequest('Invalid Credentials.'));
    }
  }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    // this route is restricted
  }
}
