import { ApiProperty } from '@nestjs/swagger';
import { DateDataType } from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @ApiProperty({
    example: '8a6e0804-2bd0-4672-b79d-d97027f9071a',
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({
    example: 'username',
    description: 'Имя пользвателя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: 'admin@mail.ru',
    description: 'Email',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'admin',
    description: 'Email',
  })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  createdAt: DateDataType;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  updatedAt: DateDataType;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isAdmin?: boolean;
}
