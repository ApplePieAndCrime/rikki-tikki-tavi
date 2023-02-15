import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindOptions } from 'sequelize';
import { DialoguesService } from './dialogues.service';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { UpdateDialogueDto } from './dto/update-dialogue.dto';
import { Dialogue } from './entities/dialogue.entity';

@ApiTags('диалоги')
@Controller('dialogues')
export class DialoguesController {
  constructor(private readonly dialoguesService: DialoguesService) {}

  @Post()
  create(@Body() createDialogueDto: CreateDialogueDto) {
    return this.dialoguesService.create(createDialogueDto);
  }

  @ApiQuery({ name: 'filter' })
  @Get()
  findAll(@Query('filter') filter: FindOptions<Dialogue> | undefined) {
    return this.dialoguesService.findAll(filter);
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
    return this.dialoguesService.update(id, updateDialogueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dialoguesService.remove(+id);
  }
}
