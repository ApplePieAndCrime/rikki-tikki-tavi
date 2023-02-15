import { Injectable } from '@nestjs/common';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
@Injectable()
export class CreateUserDto {
  @ApiProperty({
    example: 'username',
    description: 'Имя пользвателя',
  })
  username: string;

  @IsEmail({}, { message: 'Некорректный email' })
  @ApiProperty({
    example: 'admin@mail.ru',
    description: 'Email',
  })
  email: string;

  @ApiProperty({
    example: 'admin',
    description: 'Email',
  })
  password?: string;

  @ApiProperty({
    example: 'example',
    description: 'Refresh token',
  })
  refreshToken?: string;
}
