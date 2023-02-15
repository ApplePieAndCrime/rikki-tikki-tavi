import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../auth.constants';
import { Strategy } from 'passport-local';
import { config } from 'dotenv';

config();

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    console.log('secret: ', jwtConstants.secret);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, username: payload.username };
  // }

  async validate(payload: any) {
    return payload;
  }
}
