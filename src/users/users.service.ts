import { User } from 'src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Op, UpdateOptions } from 'sequelize';
import { parseResult } from 'utils/helpers';
import { uuid } from 'uuidv4';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const id = uuid();
    const created = await this.usersRepository.create({ ...createUserDto, id });
    return this.findByUsername(created.username);
  }

  findAll() {
    // return `This action returns all users`;
    return parseResult(this.usersRepository.findAll());
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { username },
      raw: true,
    });
    console.log('user findOne', { username, user });
    return user;
  }

  async findByEmailOrUsername(login: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { [Op.or]: [{ username: login }, { email: login }] },
      raw: true,
    });

    console.log('user findOne', { login, user });
    return user;
  }

  async findByUsername(login: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { username: login },
      raw: true,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email },
      raw: true,
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id },
      raw: true,
    });

    return user;
  }

  updateById(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(updateUserDto, { where: { id } });
  }

  update(updateUserDto: UpdateUserDto, options: UpdateOptions) {
    return this.usersRepository.update(updateUserDto, options);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
