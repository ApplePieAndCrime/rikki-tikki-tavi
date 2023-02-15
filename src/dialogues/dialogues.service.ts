import { Dialogue } from './entities/dialogue.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { UpdateDialogueDto } from './dto/update-dialogue.dto';
import { FindAttributeOptions, FindOptions } from 'sequelize';
import { uuid } from 'uuidv4';

@Injectable()
export class DialoguesService {
  constructor(
    @InjectModel(Dialogue) private dialoguesRepository: typeof Dialogue,
  ) {}

  async create(createDialogueDto: CreateDialogueDto): Promise<Dialogue> {
    const id = uuid();

    const res = await this.dialoguesRepository.create({
      ...createDialogueDto,
      id,
    });
    return res;
  }

  async findAll(filter: FindOptions<Dialogue>) {
    const res = await this.dialoguesRepository.findAll(filter);
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} dialogue`;
  }

  update(id: string, updateDialogueDto: UpdateDialogueDto) {
    return this.dialoguesRepository.update(updateDialogueDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} dialogue`;
  }
}
