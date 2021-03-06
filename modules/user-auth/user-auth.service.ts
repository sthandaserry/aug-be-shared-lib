/**
 * @file auth.service.ts - Authenticate user details and generate authroziation token.
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 23/07/2018
 * lastModified: 23/07/2018
 */
import * as jwt from 'jsonwebtoken';
import { Injectable, Inject, HttpException, HttpStatus, Body } from '@nestjs/common';
import { Model, ValidationError } from 'mongoose';
import { UserJwtPayload } from './interfaces/user-jwt-payload.interface';
import { User } from '../users/interfaces/user.interface';
import { UserCredential } from './interfaces/user-credential.interface';
import { Encrypter, statusCode } from '../../utils';
import { wrapError } from '../../../aug-nest-tools';

@Injectable()
export class UserAuthService {

  constructor(@Inject('AuthModelToken') private readonly userAuthModel: Model<any>, @Inject('MailerProvider') private readonly mailerProvider) { }

  async register(user: User): Promise<any> {
    try {
      // Password encrption
      const encrypter = new Encrypter();
      const salt = encrypter.createSalt();
      user.salt = salt;
      user.hpwd = encrypter.hashPwd(salt, user.pwd as string);
      user.pwd = undefined;
      user.status = 1;

      const createdUser = new this.userAuthModel(user);
      return await createdUser.save();
    } catch (e) {
      throw new HttpException(e, await statusCode(e));
    }

  }
  async authenticate(credential: UserCredential): Promise<any> {
    try {
      const user: User = await this.userAuthModel.findOne({ uname: credential.uname });
      if (user) {
        const encrypter = new Encrypter();
        if (await encrypter.doesPasswordMatch(credential.pwd, user.hpwd, user.salt)) {
          const userObj: UserJwtPayload = { uname: user.uname, email: user.email, role: user.role, _id: user._id };
          const expiresIn = 3600 * 24;
          const accessToken = jwt.sign(userObj, process.env.SECRET_KEY, { expiresIn });
          return {
            expiresIn,
            accessToken,
            role: user.role,
          };
        } else {

          return false;
        }
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }

  async forgotPassword(data: any, token: string): Promise<any> {
    try {
      const user: User = await this.userAuthModel.findOne({ $or: [{ email: data }, { uname: data }] });
      if (user) {
        user.token = token;
        return await this.userAuthModel.findOneAndUpdate({ email: user.email }, { token }, { new: true }).exec();
      } else {
        return wrapError(null, 'Email not found.');
      }
    } catch (e) {
      throw new HttpException(wrapError(e, 'Something went wrong.'), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async resetPassword(data: any): Promise<any> {
    try {
      const user: User = await this.userAuthModel.findOne({ token: data.token });
      if (user) {
        const encrypter = new Encrypter();
        const salt = encrypter.createSalt();
        const hpwd = encrypter.hashPwd(salt, data.pwd as string);
        return await this.userAuthModel.findOneAndUpdate({ email: user.email }, { salt, hpwd, $unset: { token: 1 } }, { new: true }).exec();
      } else {
        return false;
      }
    } catch (e) {
      throw new HttpException(wrapError(e, 'Something went wrong.'), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async resetUsername(data: any): Promise<any> {
    try {
      const user: User = await this.userAuthModel.findOne({ token: data.token });
      if (user) {
        return await this.userAuthModel.findOneAndUpdate({ email: user.email }, { uname: data.uname, $unset: { token: 1 } }, { new: true }).exec();
      } else {
        return false;
      }
    } catch (e) {
      throw new HttpException(wrapError(e, 'Something went wrong.'), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(payload: UserJwtPayload): Promise<any> {
    return await this.userAuthModel.findOne({ uname: payload.uname });
  }

  async find(whereColumn): Promise<User[]> {
    return await this.userAuthModel.find(whereColumn).exec();
  }
}
