/**
 * @file auth.service.ts - Authenticate admin user details and generate authroziation token.
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 16/07/2018
 * lastModified: 16/07/2018
 */
import * as jwt from 'jsonwebtoken';
import { Injectable, Inject, HttpException, HttpStatus, Body } from '@nestjs/common';
import { Model, ValidationError } from 'mongoose';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Admin } from '../admins/interfaces/admin.interface';
import { Credential } from './interfaces/credential.interface';
import { Encrypter } from '../../utils';
import { wrapError } from '../../../aug-nest-tools';

@Injectable()
export class AuthService {

  constructor(@Inject('AuthModelToken') private readonly authModel: Model<any>, @Inject('MailerProvider') private readonly mailerProvider) { }

  async authenticate(credential: Credential): Promise<any> {
    try {
      const user: Admin = await this.authModel.findOne({ uname: credential.uname });
      if (user) {
        const encrypter = new Encrypter();
        if (await encrypter.doesPasswordMatch(credential.pwd, user.hpwd, user.salt)) {
          const userObj: JwtPayload = { _id: user._id, uname: user.uname };
          const expiresIn = 3600 * 24;
          const accessToken = jwt.sign(userObj, process.env.SECRET_KEY, { expiresIn });
          return {
            expiresIn,
            accessToken,
          };
        } else {
          return false;
        }
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }

  async forgotPassword(email: any, token: string): Promise<any> {
    try {
      const admin: Admin = await this.authModel.findOne({ email });
      if (admin) {
        admin.token = token;
        return await this.authModel.findOneAndUpdate({ email: admin.email }, { token }).exec();
      } else {
        return false;
      }
    } catch (e) {
      throw new HttpException(wrapError(e, 'Something went wrong.'), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async resetPassword(data: any): Promise<any> {
    try {
      const admin: Admin = await this.authModel.findOne({ token: data.token });
      if (admin) {
        const encrypter = new Encrypter();
        const salt = encrypter.createSalt();
        admin.salt = salt;
        admin.hpwd = encrypter.hashPwd(salt, data.pwd as string);
        return await this.authModel.findOneAndUpdate({ email: admin.email }, { admin, $unset: { token: 1 } }).exec();
      } else {
        return false;
      }
    } catch (e) {
      throw new HttpException(wrapError(e, 'Something went wrong.'), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.authModel.findOne({ uname: payload.uname });
  }
}
