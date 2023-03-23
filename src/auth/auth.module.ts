import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google/google.strategy';
// import { AccessJwtStrategy } from './jwt/access-jwt.strategy';
import { UsersModule } from './../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { LocalStrategy } from './jwt/local.strategy';
// import { RefreshJwtStrategy } from './jwt/refresh-jwt.strategy';

console.log({ jwtConstants });
@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
        // secretOrPrivateKey: configService.get('JWT_SESSION_SECRET'),
      }),
    }),
  ],
  providers: [
    AuthService,
    // AccessJwtStrategy,
    // RefreshJwtStrategy,
    GoogleStrategy,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
