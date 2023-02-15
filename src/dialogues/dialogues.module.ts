import { Module } from '@nestjs/common';
import { DialoguesService } from './dialogues.service';
import { DialoguesController } from './dialogues.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { Dialogue } from './entities/dialogue.entity';

@Module({
  controllers: [DialoguesController],
  providers: [DialoguesService],
  imports: [SequelizeModule.forFeature([User, Dialogue])],
  exports: [DialoguesService],
})
export class DialoguesModule {}
