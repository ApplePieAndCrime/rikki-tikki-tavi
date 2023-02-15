import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

@Injectable()
export class LoginUserDto {
  @ApiProperty({ example: 'test@mail.ru', description: 'Email или Username' })
  @IsString({ message: 'Должна быть строкой' })
  readonly username: string;

  @ApiProperty({ example: 'test', description: 'Пароль' })
  @IsString({ message: 'Должна быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;
}
