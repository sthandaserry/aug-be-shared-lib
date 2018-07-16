import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ...authProviders],
})
export class AuthModule {}
