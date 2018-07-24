import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserJwtStrategy } from './user-jwt.strategy';
import { UserAuthController } from './user-auth.controller';
import { RegistrationController } from './registration.controller';
import { UserForgotpasswordController } from './user-forgotpassword.controller';
import { UserResetpasswordController } from './user-resetpassword.controller';
import { userAuthProviders } from './user-auth.providers';

@Module({
  controllers: [UserAuthController, RegistrationController, UserForgotpasswordController, UserResetpasswordController],
  providers: [UserAuthService, UserJwtStrategy, ...userAuthProviders],
})
export class UserAuthModule {}
