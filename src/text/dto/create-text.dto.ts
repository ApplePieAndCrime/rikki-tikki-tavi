import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class CreateTextDto {
  @ApiProperty({
    example: 'Название',
    description: 'Название',
  })
  title: string;

  @ApiProperty({
    example: 'apple pie and crime',
    description: 'Оригинальный текст',
  })
  type: 'dictation' | 'translation';

  @ApiProperty({
    example: '',
    description: 'Описание',
  })
  description: string;

  @ApiProperty({
    example: 'apple pie and crime',
    description: 'Оригинальный текст',
  })
  originalText: string;

  @ApiProperty({
    example: 'en',
    description: 'Оригинальный язык',
  })
  originalLanguage: string;

  @ApiProperty({
    example: 'яблочный пирог и преступление',
    description: 'Переведенный текст',
  })
  translatedText: string;

  @ApiProperty({
    example: 'ru',
    description: 'Язык перевода',
  })
  translatedLanguage: string;

  @ApiProperty({
    example: 'apple pie and crime',
    description: 'Текст юзера',
  })
  userText?: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1674855086643-b884fd82fabb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTA2NTB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzY0MTYyNzI&ixlib=rb-4.0.3&q=80&w=1080',
    description: 'Картинка',
  })
  imageUrl?: string;

  @ApiProperty({
    example: '8a6e0804-2bd0-4672-b79d-d97027f9071a',
    description: 'id юзера',
  })
  ownerId: string;

  @ApiProperty({
    example: '[]',
    description: 'Юзеры',
  })
  users: User[];
}
