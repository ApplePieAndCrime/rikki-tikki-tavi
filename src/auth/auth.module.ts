import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google/google.strategy';
import { AccessJwtStrategy } from './jwt/access-jwt.strategy';
import { UsersModule } from './../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { LocalStrategy } from './local/local.strategy';
import { RefreshJwtStrategy } from './jwt/refresh-jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AccessJwtStrategy,
    GoogleStrategy,
    RefreshJwtStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
