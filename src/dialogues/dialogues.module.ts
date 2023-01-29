import { Module } from '@nestjs/common';
import { DialoguesService } from './dialogues.service';
import { DialoguesController } from './dialogues.controller';

@Module({
  controllers: [DialoguesController],
  providers: [DialoguesService],
})
export class DialoguesModule {}
