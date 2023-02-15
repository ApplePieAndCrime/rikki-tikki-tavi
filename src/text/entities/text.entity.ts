import { User } from './../../users/entities/user.entity';

import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  DataType,
  Model,
  HasMany,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';

import { uuid } from 'uuidv4';

@Table({ tableName: 'text' })
export class Text extends Model<Text> {
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
    example: 'Название',
    description: 'Название',
  })
  @Column({
    type: DataType.STRING,
  })
  title: string;

  @ApiProperty({
    example: 'apple pie and crime',
    description: 'Оригинальный текст',
  })
  @Column({
    type: DataType.STRING,
  })
  type: 'dictation' | 'translation';

  @ApiProperty({
    example: false,
    description: 'Доступен всем?',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isPublic?: boolean;

  @ApiProperty({
    example: '',
    description: 'Описание',
  })
  @Column({
    type: DataType.STRING,

    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: 'en',
    description: 'Оригинальный язык',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  originalLanguage: string;

  @ApiProperty({
    example: 'apple pie and crime',
    description: 'Оригинальный текст',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  originalText: string;

  @ApiProperty({
    example: 'ru',
    description: 'Язык перевода',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  translatedLanguage: string;

  @ApiProperty({
    example: 'яблочный пирог и преступление',
    description: 'Переведенный текст',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  translatedText: string;

  @ApiProperty({
    example: 'apple pie and crime',
    description: 'Текст юзера',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  userText?: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1674855086643-b884fd82fabb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTA2NTB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzY0MTYyNzI&ixlib=rb-4.0.3&q=80&w=1080',
    description: 'Картинка',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imageUrl?: string;

  @ApiProperty({
    example: '8a6e0804-2bd0-4672-b79d-d97027f9071a',
    description: 'id юзера',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
  })
  ownerId: string;

  // @HasMany(() => User)
  // @ApiProperty({
  //   example: '[]',
  //   description: 'Юзеры',
  // })
  // users: User[];
}
