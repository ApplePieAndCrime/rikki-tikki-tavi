import { AuthService } from './../auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import * as BirdPromise from 'bluebird';
import { users } from './data';

@Injectable()
export class HelpersService {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  async createBaseData(): Promise<object> {
    const createdUsers = await BirdPromise.map(users, async (user) => {
      const tokensData = await this.authService.register(user);
      const userData = await this.usersService.findByEmailOrUsername(
        user.email,
      );
      return { ...userData, ...tokensData };
    });

    return { createdUsers };
  }
}
