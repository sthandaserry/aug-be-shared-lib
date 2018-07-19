import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ForgotpasswordController } from './forgotpassword.controller';
import { ResetpasswordController } from './resetpassword.controller';

import { authProviders } from './auth.providers';

@Module({
  controllers: [AuthController, ForgotpasswordController, ResetpasswordController],
  providers: [AuthService, JwtStrategy, ...authProviders],
})
export class AuthModule {}
