import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { Text } from './entities/text.entity';

import { uuid } from 'uuidv4';

@Injectable()
export class TextsService {
  constructor(@InjectModel(Text) private textsRepostory: typeof Text) {}

  async create(createTextDto: CreateTextDto) {
    const id = uuid();
    const createdText = await this.textsRepostory.create({
      ...createTextDto,
      id,
    });
    return this.findOneById(id);
  }

  findAll(filter: FindOptions<Text>) {
    return this.textsRepostory.findAll(filter);
  }

  findOneById(id: string) {
    return this.textsRepostory.findOne({ where: { id } });
  }

  findOne(filter: FindOptions<Text>) {
    return this.textsRepostory.findOne(filter);
  }

  update(id: string, updateTextDto: UpdateTextDto) {
    return this.textsRepostory.update(updateTextDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} text`;
  }
}
