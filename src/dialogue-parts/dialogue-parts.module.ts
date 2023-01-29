import { Module } from '@nestjs/common';
import { DialoguePartsService } from './dialogue-parts.service';
import { DialoguePartsController } from './dialogue-parts.controller';

@Module({
  controllers: [DialoguePartsController],
  providers: [DialoguePartsService],
})
export class DialoguePartsModule {}
