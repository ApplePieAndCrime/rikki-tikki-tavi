import { CreateUserDto } from './../users/dto/create-user.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { OAuth2Client } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';
import { HttpException } from '@nestjs/common/exceptions';
import { jwtConstants } from './auth.constants';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  hashData(data: string): string {
    return bcrypt.hash(data, 5);
  }

  async getTokens(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: 60 * 15, secret: jwtConstants.secret },
    );
    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: 60 * 50 * 24 * 7, secret: jwtConstants.secretRefresh },
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
  }

  async logout(user: any) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmailOrUsername(username);
    console.log('user auth', { username, user });

    if (user && user.password === password) {
      const { password, ...rest } = user;

      return rest;
    }
    return null;
  }

  async register(userData: Partial<CreateUserDto>) {
    const existingUser = await this.usersService
      .findByEmailOrUsername(userData.email)
      .then((res) => !!res)
      .catch(() => false);

    console.log({ userData });

    if (existingUser)
      throw new HttpException('user exists', HttpStatus.BAD_REQUEST);

    const hashPassword = await this.hashData(userData.password);
    const creationData = {
      username: userData.username,
      email: userData.email,
      password: hashPassword,
    };
    const user = await this.usersService.create(creationData);
    const tokens = await this.getTokens(user.id, user.email);

    return tokens;
  }

  async login(user: any) {
    return this.getTokens(user.id, user.email);
  }

  async loginGoogle(token: string) {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const userData = ticket.getPayload();
    const existingUser = await this.usersService
      .findByEmailOrUsername(userData.email)
      .then((res) => !!res)
      .catch(() => false);

    console.log({ userData });

    if (!existingUser) {
      const username = (await this.usersService.findByUsername(userData.name))
        ? `${userData.name}-${uuidv4()}`
        : userData.name;

      const dataForCreate = {
        username,
        email: userData.email,
      };

      console.log({ username, dataForCreate });

      return await this.register(dataForCreate);

      const loginData = {
        id: userData.sub,
        username,
      };
      return this.login(loginData);
    }

    return this.login({ existingUser });

    // const payload = { username: 'tt' };
    // // log the ticket payload in the console to see what we have
    // console.log({ userData });

    // return {access_token:userData.Acc}
  }
}
