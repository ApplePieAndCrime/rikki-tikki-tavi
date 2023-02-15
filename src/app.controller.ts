import { AuthGuard } from '@nestjs/passport';

import { Controller, Get } from '@nestjs/common';
import { Body, Post, Request, UseGuards } from '@nestjs/common/decorators';

import { AuthService } from './auth/auth.service';

import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { GoogleAuthGuard } from './auth/google/google-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
}
