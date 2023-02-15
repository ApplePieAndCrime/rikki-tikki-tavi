import { SetMetadata } from '@nestjs/common';
import { config } from 'dotenv';

config();

export const jwtConstants = {
  secret: `${process.env.SECRET_KEY}`,
  secretRefresh: `${process.env.SECRET_KEY_REFRESH}`,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
