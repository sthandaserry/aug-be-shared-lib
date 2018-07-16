/**
 * @file auth.controller.ts - Authenticate admin user details
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 16/07/2018
 * lastModified: 16/07/2018
 */

import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Credential } from './interfaces/credential.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() credential: Credential): Promise<any> {
    return await this.authService.authenticate(credential);
  }

  // @Get('data')
  // @UseGuards(AuthGuard('jwt'))
  // findAll() {
  //   // this route is restricted
  // }
}
