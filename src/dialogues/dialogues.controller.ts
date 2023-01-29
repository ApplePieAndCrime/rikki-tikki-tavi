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
import { DialoguesService } from './dialogues.service';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { UpdateDialogueDto } from './dto/update-dialogue.dto';

@ApiTags('диалоги')
@Controller('dialogues')
export class DialoguesController {
  constructor(private readonly dialoguesService: DialoguesService) {}

  @Post()
  create(@Body() createDialogueDto: CreateDialogueDto) {
    return this.dialoguesService.create(createDialogueDto);
  }

  @Get()
  findAll() {
    return this.dialoguesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dialoguesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDialogueDto: UpdateDialogueDto,
  ) {
    return this.dialoguesService.update(+id, updateDialogueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dialoguesService.remove(+id);
  }
}
