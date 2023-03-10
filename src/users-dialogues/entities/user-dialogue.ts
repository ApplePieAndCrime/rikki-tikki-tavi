import { User } from './../../users/entities/user.entity';
import { Dialogue } from './../../dialogues/entities/dialogue.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'users-dialogues' })
export class UserDialogue extends Model<UserDialogue> {
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

  @ForeignKey(() => Dialogue)
  dialogueId: string;

  @BelongsTo(() => Dialogue)
  dialogue: Dialogue;

  @ForeignKey(() => User)
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
