import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserJwtStrategy } from './user-jwt.strategy';
import { UserAuthController } from './user-auth.controller';
import { RegistrationController } from './registration.controller';
import { UserForgotpasswordController } from './user-forgotpassword.controller';
import { UserResetpasswordController } from './user-resetpassword.controller';
import { userAuthProviders } from './user-auth.providers';
import { UserForgotusernameController } from './user-forgotusername.controller';
import { UserResetusernameController } from './user-resetusername.controller';

@Module({
  controllers: [UserAuthController, RegistrationController, UserForgotpasswordController, UserForgotusernameController, UserResetpasswordController,
    UserResetusernameController],
  providers: [UserAuthService, UserJwtStrategy, ...userAuthProviders],
})
export class UserAuthModule { }
