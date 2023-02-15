import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../auth.constants';
import { Strategy } from 'passport-local';
import { Request } from 'express';

import { config } from 'dotenv';

config();

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    console.log('secret: ', jwtConstants.secretRefresh);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secretRefresh,
      passReqToCallback: true,
    });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, username: payload.username };
  // }

  async validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
