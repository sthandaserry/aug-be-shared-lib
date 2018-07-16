import * as jwt from 'jsonwebtoken';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model, ValidationError } from 'mongoose';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Admin } from '../admins/interfaces/admin.interface';
import { Credential } from './interfaces/credential.interface';

import { Encrypter } from '../../utils';

@Injectable()
export class AuthService {

  constructor(@Inject('AuthModelToken')
  private readonly authModel: Model<any>) { }

  async authenticate(credential: Credential): Promise<any> {
    try {
      const user: Admin = await this.authModel.findOne({ uname: credential.uname });
      if (user) {
        const encrypter = new Encrypter();
        const isMatch = await encrypter.doesPasswordMatch(credential.pwd, user.hpwd, user.salt);
        if (await encrypter.doesPasswordMatch(credential.pwd, user.hpwd, user.salt)) {
          const userObj: JwtPayload = { uname: user.uname };
          const expiresIn = 3600;
          const accessToken = jwt.sign(userObj, process.env.SECRET_KEY, { expiresIn });
          return {
            expiresIn,
            accessToken,
          };
        }
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.authModel.findOne({ uname: payload.uname });
  }
}
