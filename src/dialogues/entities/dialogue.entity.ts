import { UserDialogue } from './../../users-dialogues/entities/user-dialogue';
import { User } from './../../users/entities/user.entity';
// import { DialoguePart } from './../../dialogue-parts/entities/dialogue-part.entity';
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

@Table({ tableName: 'dialogue' })
export class Dialogue extends Model<Dialogue> {
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
    example: '',
    description: 'Описание',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ForeignKey(() => User)
  userIds: User[];

  @ApiProperty({
    example: '[]',
    description: 'Юзеры',
  })
  @BelongsToMany(() => User, { through: () => UserDialogue })
  users: User[];

  // @ApiProperty({
  //   example: '[]',
  //   description: 'Текст по кускам',
  // })
  // partsIds: DialoguePart[];

  // @HasMany(() => DialoguePart)
  // parts: DialoguePart[];
}
