import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

import { Controller, Get } from '@nestjs/common';
import { Body, Post, Request, UseGuards } from '@nestjs/common/decorators';

import { AuthService } from './auth.service';

import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { GoogleAuthGuard } from './google/google-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Request() req: { user: Partial<CreateUserDto> }): any {
    return this.authService.register(req.user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @Get('logout')
  logout(@Body() req): any {
    return this.authService.logout(req.user);
  }

  @Get('refresh')
  refreshToken(@Request() req): any {
    return this.authService.refreshToken(req.user.id, req.user.refreshToken);
  }

  // @UseGuards(GoogleAuthGuard)
  @Post('login-google')
  loginGoogle(@Request() req): any {
    console.log({ req });
    return this.authService.loginGoogle(req.body.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
