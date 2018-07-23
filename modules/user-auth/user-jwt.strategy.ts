import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserAuthService } from './user-auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserJwtPayload } from './interfaces/user-jwt-payload.interface';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: UserAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: UserJwtPayload, done: any) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
