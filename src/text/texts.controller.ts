import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TextsService } from './texts.service';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { FindOptions } from 'sequelize';

@ApiTags('тексты')
@Controller('texts')
export class TextsController {
  constructor(private readonly textService: TextsService) {}

  @Post()
  async create(@Body() createTextDto: CreateTextDto) {
    return this.textService.create(createTextDto);
  }

  @Get()
  findAll(@Query('filter') filter: FindOptions<Text> | undefined) {
    return this.textService.findAll(filter);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.textService.findOneById(id);
  }

  @Get('findOne')
  findOne(@Query('filter') filter: FindOptions<Text> | undefined) {
    return this.textService.findOne(filter);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextDto: UpdateTextDto) {
    return this.textService.update(id, updateTextDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textService.remove(+id);
  }
}
