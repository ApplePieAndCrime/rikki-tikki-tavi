import { ApiProperty } from '@nestjs/swagger';

export class CreateDialogueDto {
  @ApiProperty({
    example: 'Название',
    description: 'Название',
  })
  title: string;

  @ApiProperty({
    example: 'Описание',
    description: 'Описание',
  })
  description: string;
}
