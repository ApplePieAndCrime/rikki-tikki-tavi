import { SetMetadata } from '@nestjs/common';
import { config } from 'dotenv';

config();

export const jwtConstants = {
  secret: `${process.env.JWT_SECRET}`,
  expiresIn: `${process.env.JWT_EXPIRES_IN}`,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
