import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AdminsService } from '../admins/admins.service';
import { Encrypter } from '../../utils';

@Injectable()
export class AuthService {

  constructor(private readonly adminsService: AdminsService) { }

  async createToken() {
    const user: JwtPayload = { uname: 'test@email.com' };
    const expiresIn = 3600;
    const accessToken = jwt.sign(user, 'secretKey', { expiresIn });
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.adminsService.findOne({ uname: payload.uname });
  }
}
