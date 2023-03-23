import { User } from './../users/entities/user.entity';
import { LoginUserDto } from './../users/dto/login-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { OAuth2Client } from 'google-auth-library';
import { uuid } from 'uuidv4';
import { ForbiddenException, HttpException } from '@nestjs/common/exceptions';
import { jwtConstants } from './auth.constants';
import { Tokens } from './types';
import Mailgen from 'mailgen';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

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

  async logout(userId: string) {
    await this.usersService.updateById(userId, { refreshToken: null });
    return true;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmailOrUsername(username);
    console.log('user auth', { username, user });

    if (user && user.password === password) {
      const { password, ...rest } = user;

      return rest;
    }
    return null;
  }

  async generateAccessToken(user: User) {
    const payload = { id: user.id, username: user.username, email: user.email };
    console.log({ payload });

    return { accessToken: this.jwtService.sign(payload), user };
  }

  async register(userData: Partial<CreateUserDto>): Promise<object> {
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

    return this.generateAccessToken(user);
  }

  async login(dto: LoginUserDto): Promise<object> {
    const user = await this.usersService.findByEmailOrUsername(dto.login);

    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) throw new ForbiddenException('Incorrect password');

    return this.generateAccessToken(user);
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    const generatedPassword = uuid();
    await this.usersService.updateById(user.id, {
      password: generatedPassword,
    });

    // const mailGenerator = new Mailgen({
    //   theme: 'default',
    //   product: {
    //     // Appears in header & footer of e-mails
    //     name: 'Mailgen',
    //     link: 'https://mailgen.js/',
    //     // Optional product logo
    //     // logo: 'https://mailgen.js/img/logo.png'
    //   },
    // });
    // const emailExample = {
    //   body: {
    //     // greeting: vendorLanguageId === 'RU' ? 'Здравствуйте, ' : 'Hello',
    //     name: user.username,
    //     // signature: vendorLanguageId === 'RU' ? 'С уважением' : 'Kind regards',
    //     intro: `Your password: ${generatedPassword}`,
    //   },
    // };

    // const emailBody = mailGenerator.generate(emailExample);

    // const emailText = mailGenerator.generatePlaintext(emailExample);

    // const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        email: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // const info = await transport.sendMail({
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: email, // list of receivers
    //   subject: 'Reset password', // Subject line
    //   // text: emailText, // plain text body
    //   // html: emailBody, // html body
    //   text: `Your password: ${generatedPassword}`,
    // });

    const mailOptions = {
      from: 'sender@gmail.com', // Sender address
      to: email, // List of recipients
      subject: 'Change password', // Subject line
      text: `Your password: ${generatedPassword}`, // Plain text body
      html: `Your password: ${generatedPassword}`,
    };

    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }

  async refresh(req: any) {
    const user = await this.usersService.findById(req.user.id);

    if (!user) throw new ForbiddenException('Access denied');

    return this.generateAccessToken(user);
  }

  async loginGoogle(token: string) {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const userData = ticket.getPayload();
    const existingUser = await this.usersService.findByEmailOrUsername(
      userData.email,
    );

    console.log({ userData });

    if (!existingUser) {
      const username = (await this.usersService.findByUsername(userData.name))
        ? `${userData.name}-${uuid()}`
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
      // return this.login(loginData);
    }
    const { email, password } = existingUser;

    return this.login({ login: email, password });

    // const payload = { username: 'tt' };
    // // log the ticket payload in the console to see what we have
    // console.log({ userData });

    // return {access_token:userData.Acc}
  }
}
