import { Tokens } from './types';
import { LoginUserDto } from './../users/dto/login-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  Body,
  HttpCode,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common/decorators';

import { AuthService } from './auth.service';

// import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { GoogleAuthGuard } from './google/google-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() user: Partial<CreateUserDto>): Promise<object> {
    return this.authService.register(user);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: LoginUserDto): Promise<object> {
    return this.authService.login(user);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() data: { email: string }): Promise<void> {
    console.log('forgooooooooooot');
    return this.authService.forgotPassword(data.email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request): any {
    console.log({ req });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = req.user;
    return this.authService.logout(user['id']);
  }

  // @Get('refresh')
  // @HttpCode(HttpStatus.OK)
  // refreshToken(@Request() req): Promise<void> {
  //   return this.authService.updateRefreshToken(
  //     req.user.id,
  //     req.user.refreshToken,
  //   );
  // }

  // @UseGuards(GoogleAuthGuard)
  @Post('login-google')
  loginGoogle(@Request() req): any {
    console.log({ req });
    return this.authService.loginGoogle(req.body.token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  refrezh(@Request() req) {
    return this.authService.refresh(req);
  }
}
