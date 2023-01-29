import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DialoguePartsService } from './dialogue-parts.service';
import { CreateDialoguePartDto } from './dto/create-dialogue-part.dto';
import { UpdateDialoguePartDto } from './dto/update-dialogue-part.dto';

@ApiTags('кусочки текста')
@Controller('dialogue-parts')
export class DialoguePartsController {
  constructor(private readonly dialoguePartsService: DialoguePartsService) {}

  @Post()
  create(@Body() createDialoguePartDto: CreateDialoguePartDto) {
    return this.dialoguePartsService.create(createDialoguePartDto);
  }

  @Get()
  findAll() {
    return this.dialoguePartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dialoguePartsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDialoguePartDto: UpdateDialoguePartDto,
  ) {
    return this.dialoguePartsService.update(+id, updateDialoguePartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dialoguePartsService.remove(+id);
  }
}
