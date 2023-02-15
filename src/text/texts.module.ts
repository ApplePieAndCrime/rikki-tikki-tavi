import { Module } from '@nestjs/common';
import { TextsService } from './texts.service';
import { TextsController } from './texts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Text } from './entities/text.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [TextsController],
  providers: [TextsService],
  exports: [TextsService],
  imports: [SequelizeModule.forFeature([User, Text])],
})
export class TextModule {}
